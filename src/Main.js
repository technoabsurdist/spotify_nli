import React, { useState } from "react";
import "./App.css";

function Main() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5001/nli", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });
      console.log(response);
      const data = await response.json();
      if (data.error) {
        setError(data.error);
        setResult(null);
      } else {
        setResult(data.query);
        setError(null);
      }
    } catch (err) {
      setError("An error occurred while processing your query");
      setResult(null);
    }
  };

  return (
    <div className="App">
      <h1>Spotify NLI</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Enter your query"
        />
        <button type="submit">Submit</button>
      </form>
      {result && (
        <div>
          <h2>Spotify search query:</h2>
          <p>{result}</p>
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
}

export default Main;