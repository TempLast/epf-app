'use strict';

const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { createApp } = require('../src/app');

let server;
let baseUrl;

before(async () => {
  server = createApp().listen(0); // port libre choisi par l'OS
  await new Promise((resolve) => server.once('listening', resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(() => server.close());

test('GET / renvoie un message de bienvenue', async () => {
  const res = await fetch(`${baseUrl}/`);
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.equal(body.message, 'Hello EPF');
});

test('GET /health renvoie le statut et la version', async () => {
  const res = await fetch(`${baseUrl}/health`);
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.equal(body.status, 'ok');
  assert.ok(typeof body.version === 'string');
});

test('GET /metrics expose des métriques Prometheus', async () => {
  await fetch(`${baseUrl}/`);
  const res = await fetch(`${baseUrl}/metrics`);
  assert.equal(res.status, 200);
  const text = await res.text();
  assert.match(text, /http_requests_total/);
});

test('POST /total calcule un total', async () => {
  const res = await fetch(`${baseUrl}/total`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items: [{ price: 10, qty: 1 }] }),
  });
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { total: 12 });
});

test('POST /total refuse un corps invalide', async () => {
  const res = await fetch(`${baseUrl}/total`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items: 'nope' }),
  });
  assert.equal(res.status, 400);
});
