import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import PokemonList from './components/PokemonList';
import PokemonDetail from './components/PokemonDetail';
import OfflineIndicator from './components/OfflineIndicator';
import ConnectionStatus from './components/ConnectionStatus';

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Header />
        <OfflineIndicator isOnline={isOnline} />
        <ConnectionStatus isOnline={isOnline} />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<PokemonList />} />
            <Route path="/pokemon/:id" element={<PokemonDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;