const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
const cors = require("cors");
// Get the OpenAI API key from the environment variables
require("dotenv").config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Spotify NLI API");
});

app.post("/nli", async (req, res) => {
  try {
    const query = req.body.query;
    const completion = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: `Translate the following English query to a spanish query: ${query}`,
      max_tokens: 50,
      n: 1,
      stop: null,
      temperature: 0.5,
    });
    console.log(completion.data.choices[0].text)
    if (
      completion.data.choices &&
      completion.data.choices.length > 0 &&
      completion.data.choices[0].text
    ) {
      res.json({ query: completion.data.choices[0].text.trim() });
    } else {
      res.status(400).json({ error: "An error occurred while processing your query" });
    }
  } catch (err) {
    console.error(err); // Log the error message
    console.error(err.response && err.response.data); // Log the OpenAI API response
    res.status(500).json({ error: "An error occurred while processing your query", message: err.message });
  }
});

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});