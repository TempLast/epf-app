'use strict';

const express = require('express');
const client = require('prom-client');
const { slugify, computeTotal } = require('./utils');

/**
 * Crée l'application Express.
 * Séparer la création (app.js) du démarrage (server.js) permet de tester sans ouvrir de port fixe.
 */
function createApp() {
  const app = express();
  app.use(express.json());

  // --- Métriques Prometheus (utilisées dans le module Projet CI/CD) ---
  const register = new client.Registry();
  client.collectDefaultMetrics({ register });

  const httpRequests = new client.Counter({
    name: 'http_requests_total',
    help: 'Nombre total de requêtes HTTP',
    labelNames: ['method', 'route', 'status'],
    registers: [register],
  });

  const httpDuration = new client.Histogram({
    name: 'http_request_duration_seconds',
    help: 'Durée des requêtes HTTP en secondes',
    labelNames: ['method', 'route', 'status'],
    buckets: [0.005, 0.01, 0.05, 0.1, 0.5, 1, 2, 5],
    registers: [register],
  });

  app.use((req, res, next) => {
    const end = httpDuration.startTimer();
    res.on('finish', () => {
      const route = req.route ? req.route.path : req.path;
      const labels = { method: req.method, route, status: res.statusCode };
      httpRequests.inc(labels);
      end(labels);
    });
    next();
  });

  // --- Routes ---
  app.get('/', (req, res) => {
    res.json({ message: 'Hello EPF', docs: ['/health', '/metrics', '/slug/:text', 'POST /total'] });
  });

  app.get('/health', (req, res) => {
    res.json({
      status: 'ok',
      version: process.env.APP_VERSION || 'dev',
      env: process.env.APP_ENV || 'local',
      uptime: Math.round(process.uptime()),
    });
  });

  app.get('/metrics', async (req, res) => {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  });

  app.get('/slug/:text', (req, res) => {
    res.json({ slug: slugify(req.params.text) });
  });

  app.post('/total', (req, res) => {
    const { items } = req.body || {};
    if (!Array.isArray(items)) {
      return res.status(400).json({ error: 'items doit être un tableau' });
    }
    return res.json({ total: computeTotal(items) });
  });

  // Simule une latence ou une erreur : pratique pour tester le monitoring et les alertes.
  app.get('/slow', async (req, res) => {
    const ms = Math.min(Number(req.query.ms) || 500, 5000);
    await new Promise((resolve) => setTimeout(resolve, ms));
    res.json({ waited: ms });
  });

  app.get('/boom', (req, res) => {
    res.status(500).json({ error: 'Erreur simulée' });
  });

  return app;
}

module.exports = { createApp };
