import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

interface Pokemon {
  id: number;
  name: string;
  image: string;
}

const PokemonList: React.FC = () => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const cachedData = localStorage.getItem('pokemonList');
        if (cachedData) {
          setPokemon(JSON.parse(cachedData));
          setLoading(false);
          return;
        }

        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        const data = await response.json();
        const results = await Promise.all(data.results.map(async (item: any) => {
          const res = await fetch(item.url);
          const pokemonData = await res.json();
          return {
            id: pokemonData.id,
            name: pokemonData.name,
            image: pokemonData.sprites.front_default
          };
        }));
        setPokemon(results);
        localStorage.setItem('pokemonList', JSON.stringify(results));
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener los Pokémon:', error);
        setError('No se pudieron cargar los Pokémon. Verifica tu conexión a internet o intenta más tarde.');
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  const filteredPokemon = pokemon.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar Pokémon"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-500"></div>
        </div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredPokemon.map((p) => (
            <Link key={p.id} to={`/pokemon/${p.id}`} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300">
              <img src={p.image} alt={p.name} className="w-full h-32 object-contain mb-2" />
              <h2 className="text-center text-lg font-semibold capitalize">{p.name}</h2>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default PokemonList;