import path from 'node:path';
import { pathToFileURL } from 'node:url';

const { route } = await import(pathToFileURL(path.resolve(process.argv[2], 'src/policy.mjs')).href);
const base = { threshold: 0.8, maxLocalChars: 1500, cascadeAvailable: true };
const seguro = { x: { type: 'choice', confidence: 0.99 } };
const casos = [
  ['estado de 1500 chars', { state: 'x'.repeat(1500), localAnswers: seguro }],
  ['estado de 1501 chars', { state: 'x'.repeat(1501), localAnswers: seguro }],
  ['confianza exactamente 0.8', { state: 'hola', localAnswers: { x: { type: 'choice', confidence: 0.8 } } }],
  ['confianza 0.79', { state: 'hola', localAnswers: { x: { type: 'choice', confidence: 0.79 } } }],
];
for (const [nombre, c] of casos) console.log(`${nombre} -> ${route({ ...base, ...c }).reason}`);
