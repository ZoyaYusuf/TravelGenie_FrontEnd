  const [prompt, setPrompt] = useState("");
  const [attractions, setAttractions] = useState([]); // store response here
  const API = import.meta.env.VITE_BACKEND_URL;

  const fetchResponse = async () => {
    try {
      const response = await fetch(`${API}/test`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ city: prompt })
      });

      const data = await response.json();
      setAttractions(data); // save to state
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  return (
    <div className="App">
      <input 
        placeholder='Enter city' 
        value={prompt} 
        onChange={(e) => setPrompt(e.target.value)} 
        className="input-box"
      />
      <button onClick={fetchResponse} className="submit-btn">
        SUBMIT
      </button>

      <div className="cards-container">
        {attractions.map((place, index) => (
          <div key={index} className="card">
            <h3 className="card-title">{place.title}</h3>
            <p className="card-desc">{place.description}</p>
          </div>
        ))}
      </div>
    </div>
  );