import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, Shield, Zap, Activity } from 'lucide-react';

interface PokemonDetails {
  id: number;
  name: string;
  types: string[];
  height: number;
  weight: number;
  abilities: string[];
  stats: {
    hp: number;
    attack: number;
    defense: number;
    speed: number;
  };
  image: string;
}

const PokemonDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const cachedData = localStorage.getItem(`pokemon_${id}`);
        if (cachedData) {
          setPokemon(JSON.parse(cachedData));
          setLoading(false);
          return;
        }

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        const pokemonData = {
          id: data.id,
          name: data.name,
          types: data.types.map((type: any) => type.type.name),
          height: data.height / 10,
          weight: data.weight / 10,
          abilities: data.abilities.map((ability: any) => ability.ability.name),
          stats: {
            hp: data.stats.find((stat: any) => stat.stat.name === 'hp').base_stat,
            attack: data.stats.find((stat: any) => stat.stat.name === 'attack').base_stat,
            defense: data.stats.find((stat: any) => stat.stat.name === 'defense').base_stat,
            speed: data.stats.find((stat: any) => stat.stat.name === 'speed').base_stat,
          },
          image: data.sprites.other['official-artwork'].front_default,
        };
        setPokemon(pokemonData);
        localStorage.setItem(`pokemon_${id}`, JSON.stringify(pokemonData));
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener los detalles del Pokémon:', error);
        setError('No se pudieron cargar los detalles del Pokémon. Verifica tu conexión a internet o intenta más tarde.');
        setLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!pokemon) {
    return <div>Pokémon no encontrado</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <Link to="/" className="inline-flex items-center text-red-500 hover:text-red-700 mb-4">
        <ArrowLeft size={20} className="mr-2" />
        Volver a la lista
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img src={pokemon.image} alt={pokemon.name} className="w-full h-auto rounded-lg shadow-lg" />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2 capitalize">{pokemon.name}</h1>
          <div className="flex space-x-2 mb-4">
            {pokemon.types.map((type) => (
              <span key={type} className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm font-semibold">
                {type}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-gray-600">Altura</p>
              <p className="font-semibold">{pokemon.height} m</p>
            </div>
            <div>
              <p className="text-gray-600">Peso</p>
              <p className="font-semibold">{pokemon.weight} kg</p>
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Habilidades</h2>
            <ul className="list-disc list-inside">
              {pokemon.abilities.map((ability) => (
                <li key={ability} className="capitalize">{ability}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Estadísticas</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <Heart className="text-red-500 mr-2" size={20} />
                <span>HP: {pokemon.stats.hp}</span>
              </div>
              <div className="flex items-center">
                <Zap className="text-yellow-500 mr-2" size={20} />
                <span>Ataque: {pokemon.stats.attack}</span>
              </div>
              <div className="flex items-center">
                <Shield className="text-blue-500 mr-2" size={20} />
                <span>Defensa: {pokemon.stats.defense}</span>
              </div>
              <div className="flex items-center">
                <Activity className="text-green-500 mr-2" size={20} />
                <span>Velocidad: {pokemon.stats.speed}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;