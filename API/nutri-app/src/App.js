import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './NutriApp.css';

function NutriApp() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://sujeitoprogramador.com/rn-api/?api=posts');
        setPosts(response.data);
      } catch (error) {
        setError("Ocorreu um erro ao buscar os dados.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="feedback">Carregando...</div>;
  }

  if (error) {
    return <div className="feedback error">{error}</div>;
  }

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-content">
          <h1>Nutrição e Saúde</h1>
          <p>Explore dicas e informações sobre alimentação para uma vida mais saudável.</p>
        </div>
      </header>
      
      <div className="posts">
        {posts.map((post) => (
          <div key={post.id} className="post-card" role="article" aria-labelledby={`post-title-${post.id}`}>
            <img src={post.capa} alt={`Imagem do post: ${post.titulo}`} className="post-image" />
            <div className="post-content">
              <h2 id={`post-title-${post.id}`} className="post-title">{post.titulo}</h2>
              <p className="post-subtitle">{post.subtitulo}</p>
              <a href={post.link} className="post-link" target="_blank" rel="noopener noreferrer">
                Leia mais
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NutriApp;
