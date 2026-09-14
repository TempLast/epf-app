'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { slugify, computeTotal } = require('../src/utils');

test('slugify retire les accents et les caractères spéciaux', () => {
  assert.equal(slugify('Hello EPF !'), 'hello-epf');
  assert.equal(slugify('Intégration & Déploiement Continus'), 'integration-deploiement-continus');
  assert.equal(slugify('  déjà-slug  '), 'deja-slug');
});

test('computeTotal applique la TVA par défaut à 20 %', () => {
  assert.equal(computeTotal([{ price: 10, qty: 2 }]), 24);
});

test('computeTotal respecte un taux de TVA explicite et une quantité absente', () => {
  assert.equal(computeTotal([{ price: 100, vat: 0.055 }]), 105.5);
});

test('computeTotal ignore les valeurs non numériques', () => {
  assert.equal(computeTotal([{ price: 'abc', qty: 3 }]), 0);
});
