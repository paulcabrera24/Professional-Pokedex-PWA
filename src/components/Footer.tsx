import React from 'react';
import { Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <p>&copy; 2024 Pokedex PWA. Todos los derechos reservados.</p>
        <a href="https://github.com/your-username/pokedex-pwa" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 hover:text-gray-300">
          <Github size={20} />
          <span>GitHub</span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;