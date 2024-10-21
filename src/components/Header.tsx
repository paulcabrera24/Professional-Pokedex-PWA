import React from 'react';
import { Link } from 'react-router-dom';
import { CircleDot } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-red-500 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <CircleDot size={32} />
          <span className="text-2xl font-bold">Pokedex</span>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/" className="hover:underline">Inicio</Link></li>
            <li><a href="https://pokeapi.co/" target="_blank" rel="noopener noreferrer" className="hover:underline">PokeAPI</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;