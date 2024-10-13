import { useState } from 'react';
import ArticleCard from './components/ArticleCard';

const RealTimeUpdates = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGetRealTimeUpdates = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://127.0.0.1:5000/api/real-time-data', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log(result);

      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <button onClick={handleGetRealTimeUpdates} disabled={loading}>
        {loading ? 'Loading...' : 'Get Real-Time Updates'}
      </button>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {data && data.articles && data.articles.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {data.articles.map((article, index) => (
            <ArticleCard key={index} article={article} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RealTimeUpdates;
