import React, { useEffect } from 'react';
import './App.css';
import { getAllPokemon } from "./utils/pokemon.js";

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        // 全てのポケモンデータを取得
        const res = await getAllPokemon(initialURL);
        console.log(res);
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
      }
    };
    fetchPokemonData();
  }, []);

  return <div className="App">Pokemon App</div>;
}

export default App;
