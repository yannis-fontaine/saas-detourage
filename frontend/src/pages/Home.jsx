import React from 'react';
import ImageUploader from '../components/ImageUploader'; // Note le "../" pour remonter d'un dossier

const Home = () => {
  return (
    <div className="home-container">
      <header>
        <h1 style={{ textAlign: 'center', color: '#333' }}>
          Mon Studio Photo IA
        </h1>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>
          Détourez vos images en un clin d'œil grâce à l'intelligence artificielle.
        </p>
      </header>

      <main>
        {/* On appelle notre brique technique ici */}
        <ImageUploader />
      </main>
      
      <footer style={{ textAlign: 'center', marginTop: '50px', fontSize: '0.8rem', color: '#999' }}>
        &copy; 2026 - Projet SaaS IA
      </footer>
    </div>
  );
};

export default Home;