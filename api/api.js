const URL = "https://newsapi.org/v2/everything?q=";
const apiKey = "e169443123484483a0b943654d5d3ebd"; // Use environment variable or fallback

export default async function handler(req, res, query) {
  const response = await fetch(
    `${URL}${encodeURIComponent(query)}&apiKey=${apiKey}`
  );

  const data = await response.json();

  res.status(200).json(data);
}
