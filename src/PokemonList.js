import React from 'react';

export default function PokemonList({ pokemon, url_image }) {
  return (
    <div className='pokemonList'>
      <p>{pokemon}</p>
      <img className='pokemon-img' src={`${url_image}`} alt={`${pokemon}`} />
    </div>
  );
}
