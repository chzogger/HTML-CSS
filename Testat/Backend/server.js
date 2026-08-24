const http = require("http");
const fs = require("fs");
const path = require("path");

const STORE_PATH = path.join(__dirname, "store", "articles.json");

function getArticles(request, response) {
    if (!fs.existsSync(STORE_PATH)) {
        response.statusCode = 404;
        response.end('{"status":"Not Found"}');
        return;
    }
    response.statusCode = 200;
    response.end(fs.readFileSync(STORE_PATH));
}

function postArticles(request, response) {
    let data = "";
    request.on("readable", () => {
        let chunk = request.read();
        if (chunk != null) data = data + chunk;
    });
    request.on("end", () => {
        fs.writeFileSync(STORE_PATH, data);
        response.statusCode = 200;
        response.end('{"status":"ok"}');
    });
}

function deleteArticles(request, response) {
    if (fs.existsSync(STORE_PATH)) {
        fs.unlinkSync(STORE_PATH);
    }
    response.statusCode = 200;
    response.end('{"status":"ok"}');
}

function deleteArticle(articleId, request, response) {
    console.log("Versuche Artikel #" + articleId + " zu löschen");
    if (!fs.existsSync(STORE_PATH)) {
        response.statusCode = 404;
        response.end('{"status":"Not Found"}');
        return;
    }

    // Artikel als JSON-Array laden
    let articles = JSON.parse(fs.readFileSync(STORE_PATH));

    // Prüfen, ob der Index erlaubt ist
    if (articles.length < articleId || articleId < 1) {
        console.log("Ungültiger Index");
        response.statusCode = 404;
        response.end('{"status":"Not Found"}');
        return;
    }

    // Index entfernen
    articles.splice(articleId - 1, 1);

    // Datei wieder abspeichern
    fs.writeFileSync(STORE_PATH, JSON.stringify(articles));
    response.statusCode = 200;
    response.end('{"status":"ok"}');
}

const server = http.createServer((request, response) => {
    let url = request.url;
    let method = request.method;
    console.log("Request erhalten: " + method + " " + url);

    // CORS-Header hinzufügen
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    response.setHeader("Content-Type", "application/json");

    // OPTIONS-Request für Preflight handhaben
    if (method === "OPTIONS") {
        response.statusCode = 200;
        response.end();
        return;
    }

    if (method === "GET" && url === "/articles") {
        getArticles(request, response);
        return;
    }

    if (method === "POST" && url === "/articles") {
        postArticles(request, response);
        return;
    }

    if (method === "DELETE" && url === "/articles") {
        deleteArticles(request, response);
        return;
    }

    if (method === "DELETE" && url.startsWith("/articles/")) {
        deleteArticle(parseInt(url.substring("/articles/".length)), request, response);
        return;
    }

    response.statusCode = 400;
    response.end('{"status":"Unknown request"}');
});

// "0.0.0.0" statt "localhost" binden: unter Windows löst "localhost" beim
// Server manchmal nur auf die IPv6-Loopback-Adresse (::1) auf, wodurch der
// Server über http://localhost:5000 aus dem Browser nicht erreichbar ist.
const hostname = "0.0.0.0";
const port = 5000;
server.listen(port, hostname, () => {
    console.log(`Server running at http://localhost:${port}`);
});
