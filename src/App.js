import "./styles.css";
import { useState, useEffect } from "react";

export default function App() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const fetchData = async () => {
    const data = await fetch("https://dummyjson.com/recipes/search?q=" + input);
    const json = await data.json();
    setResults(json?.recipes);
  };

  useEffect(() => {
    fetchData();
  }, [input]);

  return (
    <div className="App">
      <h1>Autocomplete Search Bar</h1>
      <div>
        <input
          type="text"
          className="search-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setShowResults(true)}
          onBlur={() => setShowResults(false)}
        />
      </div>

      {showResults && (
        <div className="results-container">
          {results?.map((r) => (
            <span key={r.id} className="result">
              {r.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
