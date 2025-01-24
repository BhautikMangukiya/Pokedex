import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PokemonList.css";
import Pokemon from "../../Pokemon/Pokemon";

function PokemonList() {
  const [PokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [pokedexUrl, setpokedexUrl] = useState("https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20")

  const [nextUrl, setNextUrl] = useState('');
  const [prevUrl, setPrevUrl] = useState('');

  async function dowenlodPokemon() {
    setIsLoading(true)
    const response = await axios.get(pokedexUrl);   //T his downloads list of 20 pokemons

    const pokemonResult = response.data.results;  // we get the aaray of pokemons from result
     
    console.log(response.data);
    setNextUrl(response.data.next)
    setPrevUrl(response.data.previous)
    
    // iterating over the array of pokemons, and using their url, to crreate an array of promises that will downlod those 20 pokemons
    const pokemonResultPromise = pokemonResult.map((pokemon) => axios.get(pokemon.url));

    // passing that promise array to axios.all
    const pokemonData = await axios.all(pokemonResultPromise); // array of 20 pokemon detailed data 

    // now iterate on the data of each pokemon and extract id, name, image, types
    const res = pokemonData.map((pokeData) => { 
        const pokemon = pokeData.data;
        return {
          id :pokemon.id,
          name: pokemon.name,
          image: (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny,
          types: pokemon.types
        };
      })
    
     console.log(res);
     setPokemonList(res)

    setIsLoading(false);
  }

  useEffect(() => {
    dowenlodPokemon();
  }, [pokedexUrl]);

  return (
    <div className="pokemon-list-wrapper">
       <div className="Pokemon-List">Pokemon List</div>

      <div className="pokemon-list-wrapper">
      {isLoading ? "Loading .." : 
         PokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id}/>)
      }
      </div>
      
      <div className="Controls">
        <button disabled={prevUrl == null} onClick={()=> setpokedexUrl(prevUrl)}>Prev</button>
        <button disabled={nextUrl == null} onClick={()=> setpokedexUrl(nextUrl)}>Next</button>
      </div>
    </div>
  );
}

export default PokemonList;
