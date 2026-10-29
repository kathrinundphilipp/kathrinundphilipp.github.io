// Erzeugt die Liste aller persönlichen Links aus gaeste.json.
// Aufruf im Ordner des Repos:  node werkzeuge/links-erzeugen.mjs
// Ergebnis: ../einladung-links.csv (bewusst AUSSERHALB des Repos, wird nicht veröffentlicht)
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BASIS = 'https://kathrinundphilipp.github.io/?g=';
const gaeste = JSON.parse(fs.readFileSync(path.join(repo, 'gaeste.json'), 'utf8'));

const fehler = [], codes = new Set();
for (const g of gaeste) {
  if (!/^[a-z0-9-]+$/.test(g.code || '')) fehler.push(`Ungültiger Code „${g.code}“ (nur a–z, 0–9 und -)`);
  if (codes.has(g.code)) fehler.push(`Code doppelt: „${g.code}“`);
  codes.add(g.code);
  if (!g.umschlag || !g.anrede || !(g.personen >= 1)) fehler.push(`Unvollständiger Eintrag: „${g.code}“`);
}
if (fehler.length) { console.error(fehler.join('\n')); process.exit(1); }

const feld = s => `"${String(s).replace(/"/g, '""')}"`;
const zeilen = [['Code', 'Umschlag', 'Anrede', 'Personen', 'Link'].join(';'),
  ...gaeste.map(g => [g.code, g.umschlag, g.anrede, g.personen, BASIS + g.code].map(feld).join(';'))];
const ziel = path.resolve(repo, '..', 'einladung-links.csv');
fs.writeFileSync(ziel, '\uFEFF' + zeilen.join('\r\n') + '\r\n', 'utf8');
console.log(`${gaeste.length} Links geschrieben: ${ziel}`);
