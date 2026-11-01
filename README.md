# Einladung Kathrin & Philipp · 25. September 2027

Live: https://kathrinundphilipp.github.io/
(Die Save-the-Date-Seite liegt unverändert in ihrem eigenen Repo unter /save-the-date/.)

## Dateien

| Datei | Inhalt |
|---|---|
| `index.html` | Die ganze Seite. Ganz unten steht das Objekt **`INHALT`** mit allen Texten. |
| `gaeste.json` | Gästeliste (öffentlich einsehbar, daher nur Namen) |
| `assets/` | Umschlag-Standbild, Video, Schriften, Icons, Vorschaubild, Kalenderdatei |
| `robots.txt` | Hält Suchmaschinen fern, ohne die Save-the-Date-Seite zu blockieren |
| `werkzeuge/links-erzeugen.mjs` | Erstellt die Liste der persönlichen Links |

## Inhalte ändern

In `index.html` nach `const INHALT = {` suchen. Nur die Texte in Anführungszeichen ändern, das Layout passt sich an.

- Text in **eckigen Klammern** `[so]` erscheint auf der Seite als orange markierter Platzhalter. Ersetzen, dann verschwindet die Markierung.
- **`{du|ihr}`-Schreibweise:** Der linke Teil gilt für Gäste mit 1 Person, der rechte für mehrere (und für Besucher ohne Code). Beispiel: `"Wir freuen uns auf {dich|euch}"`.
- Absätze mit einer Leerzeile trennen: `"Erster Absatz.\n\nZweiter Absatz."`
- Programmpunkte: in `ablauf.punkte` Einträge hinzufügen oder löschen.
- FAQ: in `faq.fragen` Einträge hinzufügen oder löschen.
- Trauzeugen: `telefon` im internationalen Format, z. B. `"+49 170 1234567"`. Dann erscheinen „Anrufen“ und (mit `whatsapp: true`) „WhatsApp“.
- **Fotos:** Bilder nach `assets/fotos/` legen (am besten WebP, ca. 1600 px breit, dazu eine 800-px-Version) und in `fotos.bilder` eintragen. Bei leerer Liste wird die Sektion ausgeblendet.
- **Musik:** MP3 nach `assets/musik.mp3` legen und `musik: "assets/musik.mp3"` setzen. Dann erscheint oben rechts der Ton-Schalter (standardmäßig aus).
- **Kalender:** Ändert sich die Uhrzeit, bitte auch `assets/hochzeit.ics` anpassen (aktuell ganztägiger Termin am 25.09.2027).

## Gäste hinzufügen

Ein Eintrag in `gaeste.json`:

```json
{
  "code": "schmidt",
  "umschlag": "Familie Schmidt",
  "anrede": "Liebe Familie Schmidt",
  "personen": 3
}
```

- `code`: nur Kleinbuchstaben, Ziffern und Bindestrich, ohne Umlaute (ü → ue). Der Link lautet dann `https://kathrinundphilipp.github.io/?g=schmidt`.
- `umschlag`: steht handschriftlich auf dem Umschlag und ist im Formular vorausgefüllt. Ein Zeilenumbruch erfolgt automatisch.
- `anrede`: wird genau so übernommen, z. B. „Liebe Anna und lieber Tom“.
- `personen`: Höchstzahl im Formular.
- Optional `"form": "du"` oder `"form": "ihr"`, wenn die automatische Wahl (1 Person = du) nicht passt.
- Optional `"kinder": true`: Dann erscheint in der Begrüßung zusätzlich der Absatz zum Thema Kinder (Text in `INHALT.begruessung.kinder`).
- Zwischen Einträgen steht ein Komma, nach dem letzten keins.

Danach die Linkliste neu erzeugen. Sie wird **außerhalb** des Repos gespeichert und daher nicht veröffentlicht:

```
node werkzeuge/links-erzeugen.mjs
```

Ergebnis: `../einladung-links.csv` (öffnet sich in Excel). Das Skript meldet auch doppelte oder ungültige Codes.

## Zu- und Absagen per Google Formular

Das Formular auf der Seite ist selbst gestaltet und schickt die Antworten im Hintergrund an ein Google-Formular. Einmalig einrichten:

1. Auf https://forms.google.com ein neues Formular anlegen mit **sechs Fragen** in genau dieser Reihenfolge, alle als **Kurzantwort** und **nicht** als Pflichtfeld:
   Gastcode · Namen · Antwort · Personen · Essenswünsche · Nachricht (Nachricht darf „Absatz“ sein).
2. Unter Einstellungen: „E-Mail-Adressen erfassen“ **aus**, „Auf 1 Antwort beschränken“ **aus**.
3. Reiter „Antworten“ → „Mit Google Tabellen verknüpfen“. Dort erscheinen alle Antworten als Tabelle.
4. Reiter „Antworten“ → ⋮ → „E-Mail-Benachrichtigungen für neue Antworten erhalten“.
5. Oben rechts ⋮ → „Vorausgefüllten Link abrufen“, in jedes Feld `x` eintragen, „Link abrufen“ und den Link kopieren. Er enthält sechs Teile wie `entry.123456789=x`.
6. In `index.html` unter `rsvp.googleForm` eintragen:
   ```js
   googleForm: {
     action: "https://docs.google.com/forms/d/e/…/formResponse",   // Link bis vor „viewform“, dann „formResponse“
     felder: { code: "entry.111", name: "entry.222", antwort: "entry.333",
               personen: "entry.444", essen: "entry.555", nachricht: "entry.666" }
   }
   ```
   Die Zahlen in derselben Reihenfolge wie die Fragen übernehmen.

Solange `action` leer ist, läuft das Formular im **Testmodus**: Die Danke-Ansicht erscheint mit dem Hinweis „Formular noch nicht verbunden“, und nichts wird gespeichert.

Hinweis: Die Seite merkt sich auf dem jeweiligen Handy, dass schon geantwortet wurde, und zeigt dann direkt „Danke“ mit „Antwort ändern“. Eine geänderte Antwort erscheint als neue Zeile in der Tabelle. Es gilt die jeweils neueste.

## Veröffentlichen

GitHub Pages veröffentlicht automatisch jeden Stand des `main`-Branches. Im Repo-Ordner:

```
git add -A
git commit -m "Texte aktualisiert"
git push
```

Nach etwa einer Minute ist die Änderung live. Falls das Handy noch die alte Version zeigt: Seite neu laden.
Alternativ geht das direkt im Browser auf github.com: Datei öffnen → Stift-Symbol → „Commit changes“.

## Technik

- Statisch, ohne Build-Tools. CSS und JS stehen direkt in `index.html`.
- Schriften selbst gehostet: Eyesome Script (Datei `assets/fonts/eyesome.woff2`, die Lizenz muss die Web-Nutzung erlauben) und Montserrat 200–500 (SIL Open Font License). Solange `eyesome.woff2` fehlt, springt Mrs Saint Delafield als Script-Ersatz ein.
- Farben (oben in `index.html` unter `:root`): Creme #F7EDE4, Grüntöne #465C47 · #576D53 · #7D9883 · #74896F, Gold #B39A62 nur für feine Akzente.
- Intro-Video: 720×1280, H.264, faststart, ca. 1,1 MB. Der Name auf dem Umschlag wird relativ zum Bild positioniert. Das fallende Siegel „überdeckt“ die Tinte über eine Maske, die pro Videoframe der gemessenen Siegelbahn folgt (`SEAL` in `index.html`).
- Wird ein neues Video eingesetzt, müssen `SEAL` und `FADE_FROM`/`FADE_TO` neu abgestimmt werden.
