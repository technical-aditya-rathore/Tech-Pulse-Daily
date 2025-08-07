// const URL = "https://newsapi.org/v2/everything?q=";
// const apiKey = "e169443123484483a0b943654d5d3ebd"; // Use environment variable or fallback

// export default async function handler(req, res, query) {
//   const response = await fetch(
//     `${URL}${encodeURIComponent(query)}&apiKey=${apiKey}`
//   );

//   const data = await response.json();

//   res.status(200).json(data);
// }


const URL = "https://newsapi.org/v2/everything?q=";
const apiKey = "e169443123484483a0b943654d5d3ebd"; // Ideally use process.env.NEWS_API_KEY

export default async function handler(req, res) {
  const { query } = req.query; // Get query from request URL

  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  try {
    const response = await fetch(
      `${URL}${encodeURIComponent(query)}&apiKey=${apiKey}`
    );

    if (!response.ok) {
      throw new Error(`News API error: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("API error:", error);
    res.status(500).json({ error: "Failed to fetch news" });
  }
}
