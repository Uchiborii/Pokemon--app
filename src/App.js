import React, { useState, useEffect } from 'react';
import './App.css';
import { getAllPokemon, getPokemon } from "./utils/pokemon.js";
import Card from './components/Card.js';

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]); // ステートとしてpokemonDataを定義

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        // 全てのポケモンデータを取得
        const res = await getAllPokemon(initialURL);
        // 各ポケモンの詳細なデータを取得
        await loadPokemon(res.results);
        // console.log(res.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
        setLoading(false); // エラー時もローディングを終了
      }
    };
    fetchPokemonData();
  }, []);

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData); // ステートを更新
  };

  return (
    <div className="App">
      {loading ? (
        <h1>ロード中・・・</h1>
      ) : (
        <div className="pokemonCardContainer">
          {pokemonData.map((pokemon, i) => {
            return <Card key={i} pokemon={pokemon} />; // keyを追加
          })}
        </div>
      )}
    </div>
  );
}

export default App;
