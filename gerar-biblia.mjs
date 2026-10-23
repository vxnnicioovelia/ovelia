#!/usr/bin/env node
// Atalho da raiz para manter o gerador oficial em tools/gerar-biblia.mjs.
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const root = path.dirname(fileURLToPath(import.meta.url));
const target = path.join(root, 'tools', 'gerar-biblia.mjs');
const result = spawnSync(process.execPath, [target, ...process.argv.slice(2), root], { stdio: 'inherit' });
if (result.error) { console.error('Não foi possível iniciar o gerador da pasta tools: ' + result.error.message); process.exit(1); }
process.exit(Number.isInteger(result.status) ? result.status : 1);
