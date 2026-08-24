# Testat – News-Blog (WT1 + WT2)

Drei Teile, die zusammenspielen:

- **Backend** – Node.js-Server (nur Core-Module, kein Framework), speichert die News-Artikel in `Backend/store/articles.json`.
- **Blog** – Statisches HTML/CSS/JS-Frontend, zeigt die News-Liste an. Lädt die Artikel per `fetch` vom Backend.
- **Editor** – React-Anwendung (Create React App) zum Hinzufügen und Löschen von News-Artikeln.

## Starten

**1. Backend** (Port 5000, immer zuerst starten):
```bash
cd Backend
npm start
```

**2. Blog-Frontend** (z. B. Port 5501/5502, beliebiger statischer Server):
```bash
cd Blog
npx serve . -l 5501
```
Danach `http://localhost:5501/index.html` im Browser öffnen. Ohne laufendes Backend bleibt die News-Liste leer.

**3. Editor** (Port 3000):
```bash
cd Editor
npm install   # einmalig
npm start
```
Danach `http://localhost:3000` im Browser öffnen. Neue Artikel werden sofort im Backend gespeichert und erscheinen nach einem Reload auch im Blog-Frontend.

## Hinweis

Backend und Editor müssen parallel laufen (zwei Terminals), damit das Zusammenspiel funktioniert.
