import news from "../data/news.js";

const container = document.getElementById("news-container");

if (container) {
  news.forEach((newsItem) => {
    const col = document.createElement("div");
    if (!newsItem.urlToImage) return; // Skip articles without images

    // Optional: remove Bootstrap-specific class
    col.setAttribute(
      "style",
      "padding: 10px; box-sizing: border-box; width: 100%; max-width: 400px; margin: 0 auto;"
    );

    const {
      source,
      author,
      title,
      description,
      url,
      urlToImage,
      publishedAt,
      content,
    } = newsItem;

    const imageUrl = urlToImage || "img/news-350x223-1.jpg";
    const safeTitle = title || "Untitled";
    const safeDescription = description || "No description available.";
    const safeAuthor = author || "Unknown Author";
    const safeSource = source?.name || "Unknown Source";
    const safeContent = content
      ? content.slice(0, 200) + "..."
      : "No content available.";
    const formattedDate = new Date(publishedAt).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Kolkata",
    });

    col.innerHTML = `
<div style="display: flex; flex-direction: column; border: 1px solid #ddd; border-radius: 8px; overflow: hidden; background-color: #fff; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06); transition: transform 0.2s ease, box-shadow 0.2s ease; max-width: 100%;">
  <img src="${imageUrl}" alt="${safeTitle}" style="width: 100%; height: 180px; object-fit: cover;">
  <div style="padding: 16px; display: flex; flex-direction: column; flex-grow: 1;">
    <h5 style="font-size: 1.1rem; margin-bottom: 10px; font-weight: 600; color: #222;">${safeTitle}</h5>
    <p style="font-size: 0.85rem; color: #555; margin-bottom: 4px;"><strong>Source:</strong> ${safeSource}</p>
    <p style="font-size: 0.85rem; color: #555; margin-bottom: 4px;"><strong>Author:</strong> ${safeAuthor}</p>
    <p style="font-size: 0.85rem; color: #555; margin-bottom: 4px;"><strong>Published:</strong> ${formattedDate}</p>
    <p style="font-size: 0.9rem; margin-bottom: 8px; color: #333;"><strong>Description:</strong> ${safeDescription}</p>
    <p style="font-size: 0.9rem; color: #333;"><strong>Content:</strong> ${safeContent}</p>
    <a href="${url}" target="_blank" style="margin-top: auto; padding: 5px 10px; background-color: #0066cc; color: #fff; border-radius: 6px; text-align: center; text-decoration: none; font-weight: 500; display: inline-block; margin-top: 16px;">Read Full Article</a>
  </div>
</div>
    `;

    container.appendChild(col);
  });
}
