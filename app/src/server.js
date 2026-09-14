'use strict';

const { createApp } = require('./app');

const port = Number(process.env.PORT) || 3000;
const app = createApp();

const server = app.listen(port, () => {
  console.log(`epf-app ${process.env.APP_VERSION || 'dev'} (${process.env.APP_ENV || 'local'}) écoute sur le port ${port}`);
});

// Arrêt propre (SIGTERM envoyé par Docker / la plateforme lors d'un redéploiement)
process.on('SIGTERM', () => {
  console.log('SIGTERM reçu, arrêt en cours…');
  server.close(() => process.exit(0));
});
