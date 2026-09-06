# Testat

Mein Projekt besteht aus drei Teilen: **Backend**, **Blog** (Frontend) und **Editor**.

- Backend: Node.js-Server, speichert die News-Artikel als JSON-Datei
- Blog: die eigentliche Webseite, zeigt die News an
- Editor: React-App, damit ich News-Artikel hinzufügen/löschen kann

## Wie startet man das?

Es braucht 3 Terminals, alle drei müssen gleichzeitig laufen.

**1. Backend starten (Port 5000)**
```bash
cd Backend
npm start
```

**2. Blog starten (Port 5501)**
```bash
cd Blog
npx http-server . -p 5501 -c-1
```
Danach im Browser öffnen: http://localhost:5501/index.html

**3. Editor starten (Port 3000)**
```bash
cd Editor
npm install
npm start
```
Öffnet sich automatisch im Browser: http://localhost:3000
(`npm install` nur beim allerersten Mal nötig)

## Wichtig

- Immer zuerst das Backend starten, sonst zeigt der Blog keine News an.
- Im Editor neue Artikel hinzufügen oder löschen -> wird direkt im Backend gespeichert und ist danach auch im Blog sichtbar (Seite neu laden).
