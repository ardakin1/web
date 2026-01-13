import React, { useState, useEffect } from 'react';

const Content = () => {
  const [query, setQuery] = useState('Turkey'); 
  const [country, setCountry] = useState(null); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 

  const fetchCountry = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://restcountries.com/v3.1/name/${query}?fullText=true`);
      if (!response.ok) throw new Error("Ülke bulunamadı! Lütfen İngilizce isim giriniz.");
      const data = await response.json();
      setCountry(data[0]);
    } catch (err) {
      setError(err.message);
      setCountry(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCountry(); }, []);

  return (
    <div className={`content-area ${country?.region?.toLowerCase() || ''}`}>
      <div className="search-bar">
        <input 
          type="text" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          placeholder="Ülke adı (Örn: France)"
        />
        <button onClick={fetchCountry}>Ara</button>
      </div>

      {loading && <p className="status">Veriler yükleniyor...</p>}
      {error && <p className="error-msg">{error}</p>}

      {country && (
        <div className="country-card">
          <img src={country.flags.png} alt="Bayrak" />
          <h2>{country.name.common}</h2>
          <p><strong>Başkent:</strong> {country.capital}</p>
          <p><strong>Nüfus:</strong> {country.population.toLocaleString()}</p>
          <p><strong>Bölge:</strong> {country.region}</p>
        </div>
      )}
    </div>
  );
};

export default Content;