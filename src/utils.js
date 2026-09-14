'use strict';

/**
 * Transforme un texte en identifiant URL : "Hello EPF !" -> "hello-epf"
 */
function slugify(text) {
  return String(text)
    .normalize('NFD')
    .replace(/\p{M}/gu, '') // supprime les accents (marques combinantes)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Calcule le total TTC d'une liste d'articles { price, qty, vat }.
 * vat est un taux (0.2 pour 20 %) ; par défaut 0.2.
 */
function computeTotal(items) {
  return items.reduce((sum, item) => {
    const price = Number(item.price) || 0;
    const qty = Number(item.qty) || 1;
    const vat = item.vat === undefined ? 0.2 : Number(item.vat);
    return sum + Math.round(price * qty * (1 + vat) * 100) / 100;
  }, 0);
}

module.exports = { slugify, computeTotal };
