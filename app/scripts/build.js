'use strict';

/**
 * "Build" minimaliste : copie ce qui est nécessaire à l'exécution dans dist/.
 * Dans un vrai projet, ce serait une transpilation (TypeScript), un bundling (Vite, esbuild), etc.
 * L'objectif pédagogique est d'avoir un artefact à conserver dans la CI.
 */
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });
fs.cpSync(path.join(root, 'src'), path.join(dist, 'src'), { recursive: true });
for (const f of ['package.json', 'package-lock.json']) {
  if (fs.existsSync(path.join(root, f))) fs.copyFileSync(path.join(root, f), path.join(dist, f));
}

const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
fs.writeFileSync(
  path.join(dist, 'BUILD_INFO.json'),
  JSON.stringify(
    {
      name: pkg.name,
      version: process.env.APP_VERSION || pkg.version,
      builtAt: new Date().toISOString(),
      commit: process.env.GITHUB_SHA || process.env.GIT_COMMIT || 'unknown',
    },
    null,
    2,
  ),
);

console.log(`Build OK -> ${dist}`);
