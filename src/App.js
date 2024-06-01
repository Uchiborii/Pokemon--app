import React, { useState, useEffect } from 'react';
import './App.css';
import { getAllPokemon, getPokemon } from "./utils/pokemon.js";
import Card from './components/Card/Card.js';
import Navbar from './components/Navbar/Navbar.js';

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]); // ステートとしてpokemonDataを定義
  const [nextURL, setNextURL] = useState("");
  const [prevURL, setPrevURL] = useState("");

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        // 全てのポケモンデータを取得
        const res = await getAllPokemon(initialURL);
        // 各ポケモンの詳細なデータを取得
        await loadPokemon(res.results);
        setNextURL(res.next);
        setPrevURL(res.previous);
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

  const handleNextPage = async() => {
    setLoading(true);
    let data = await getAllPokemon(nextURL);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  };

  const handlePrevPage = async() => {
    if(!prevURL) return;
    setLoading(true);
    let data = await getAllPokemon(prevURL);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  };

  return (
    <>
    <Navbar />
    <div className="App">
      {loading ? (
        <h1>ロード中・・・</h1>
      ) : (
        <>
          <div className="pokemonCardContainer">
            {pokemonData.map((pokemon, i) => {
              return <Card key={i} pokemon={pokemon} />; // keyを追加
            })}
          </div>
          <div className="btn">
            <button onClick={handlePrevPage}>前へ</button>
            <button onClick={handleNextPage}>次へ</button>
          </div>
        </>
      )}
    </div>
    </>
  );
}


export default App;
