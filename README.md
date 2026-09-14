# epf-app — application d'exemple CI/CD

[![TP2-CI](https://github.com/TempLast/epf-app/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/TempLast/epf-app/actions/workflows/ci.yml)

Petite API Express utilisée comme fil rouge des modules *Intégration et Déploiement Continus* et *Projet CI/CD*.

## Lancer

```bash
npm ci
npm run dev        # http://localhost:3000
```

| Route | Description |
|---|---|
| `GET /` | Message de bienvenue |
| `GET /health` | Statut, version (`APP_VERSION`), environnement (`APP_ENV`), uptime |
| `GET /metrics` | Métriques Prometheus (`http_requests_total`, `http_request_duration_seconds`, métriques Node) |
| `GET /slug/:text` | Slugifie un texte |
| `POST /total` | `{ "items": [{ "price": 10, "qty": 2, "vat": 0.2 }] }` → total TTC |
| `GET /slow?ms=500` | Répond après `ms` millisecondes (test de latence / alertes) |
| `GET /boom` | Répond 500 (test des alertes d'erreurs) |

## Commandes utilisées par la CI

```bash
npm run lint     # ESLint
npm test         # node --test
npm run build    # produit dist/ (artefact)
```

## Docker

```bash
docker build -t epf-app:local --build-arg APP_VERSION=local .
docker run --rm -p 3000:3000 -e APP_ENV=local epf-app:local
```

## Configuration

Uniquement par variables d'environnement (voir `.env.example`) : `PORT`, `APP_ENV`, `APP_VERSION`.
