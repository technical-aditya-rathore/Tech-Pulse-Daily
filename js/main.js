// // Your API key - remember to keep it secret in production!
// // const apiKey = "0ea2bdb2e0714ed0a010339f866ae4b0";
// const apiKey = "e169443123484483a0b943654d5d3ebd";

// // Base URL for news API
// const URL = "https://newsapi.org/v2/everything?q=";

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
  const query = searchText.value.trim();

  if (!query) return; // Don't fetch if query is empty
  fetchNews(query);
  searchText.value = "";
  document.getElementById("top-news").innerHTML = ""; // Clear the input after search
});

// Fetch news articles asynchronously based on search query
// async function fetchNews(query) {
//   try {
//     const res = await fetch("/api/news");
//     // const res = await fetch(
//     //   `${URL}${encodeURIComponent(query)}&apiKey=${apiKey}`
//     // );
//     if (!res.ok) {
//       throw new Error(`HTTP error! status: ${res.status}`);
//     }
//     const data = await res.json();
//     bindData(data.articles);
//   } catch (error) {
//     console.error("Failed to fetch news:", error);
//   }
// }


async function fetchNews(query) {
  try {
    const res = await fetch(`/api/news?query=${encodeURIComponent(query)}`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    bindData(data.articles);
  } catch (error) {
    console.error("Failed to fetch news:", error);
  }
}



// Bind fetched articles to the DOM
function bindData(articles) {
  const cardsContainer = document.getElementById("cardscontainer");
  const newsCardTemplate = document.getElementById("template-news-card");

  cardsContainer.innerHTML = ""; // Clear previous results

  articles.forEach((article) => {
    if (!article.urlToImage) return; // Skip articles without images

    const cardClone = newsCardTemplate.content.cloneNode(true);
    fillDataInCard(cardClone, article);
    cardsContainer.appendChild(cardClone);
  });
}

// Fill individual card with article data
function fillDataInCard(cardClone, article) {
  const newsImg = cardClone.querySelector("#news-img");
  const newsTitle = cardClone.querySelector("#news-title");
  const newsSource = cardClone.querySelector("#news-source");
  const newsDesc = cardClone.querySelector("#news-desc");

  newsImg.src = article.urlToImage;
  newsImg.alt = article.title || "News Image";

  newsTitle.textContent = article.title
    ? `${article.title.slice(0, 60)}...`
    : "No Title";
  newsDesc.textContent = article.description
    ? `${article.description.slice(0, 150)}...`
    : "";

  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });
  newsSource.textContent = `${article.source.name} · ${date}`;

  cardClone.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
}

let curSelectedNav = null;
function onNavItemClick(id) {
  fetchNews(id);
  const navItem = document.getElementById(id);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = navItem;
  curSelectedNav.classList.add("active");
}

// Optional: load default news on page load
// window.addEventListener("load", () => {
//   fetchNews("technology"); // default category or query
// });
