// Backend muss laufen (Testat/Backend, npm start), sonst bleibt die Liste leer
const url = "http://localhost:5000/articles";

function loadArticles() {
    fetch(url)
        .then(response => response.json())
        .then(articles => {
            const articlesContainer = document.getElementById("news-container");
            articles.forEach(article => {
                const articleElement = document.createElement("article");
                articleElement.classList.add("news-card");
                articleElement.innerHTML = `
                    <h2 class="news-title">${article.Titel}</h2>
                    ${article.Bild ? `<img src="${article.Bild}" alt="">` : ""}
                    <p class="news-text">${article.Summary}</p>
                    <a href="details.html?id=${article.Id}">Mehr Lesen</a>
                `;
                articlesContainer.appendChild(articleElement);
            });
        })
        .catch(error => {
            console.error("Fehler beim Laden der Artikel:", error);
        });
}

function loadArticle() {
    const articleId = new URLSearchParams(window.location.search).get("id");
    fetch(url)
        .then(response => response.json())
        .then(articles => {
            const article = articles.find(a => a.Id == articleId);
            const articleElement = document.getElementById("article");
            if (!article) {
                articleElement.innerHTML = "<p>Diesen Artikel gibt es leider nicht.</p>";
                return;
            }
            articleElement.innerHTML = `
                <header>
                    <h1>${article.Titel}</h1>
                </header>
                ${article.Bild ? `<img src="${article.Bild}" alt="">` : ""}
                <section>
                    <p>${article.Text}</p>
                </section>
            `;
        })
        .catch(error => {
            console.error("Fehler beim Laden des Artikels:", error);
        });
}
