#!/usr/bin/env node
// Compatibilidade: o workflow histórico chama tools/gerar-liturgia.mjs,
// enquanto o gerador completo e revisado fica na raiz do site.
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const target = path.join(root, 'gerar-liturgia.mjs');
const result = spawnSync(process.execPath, [target, ...process.argv.slice(2)], { stdio: 'inherit' });
if (result.error) { console.error('Não foi possível iniciar gerar-liturgia.mjs: ' + result.error.message); process.exit(1); }
process.exit(Number.isInteger(result.status) ? result.status : 1);
