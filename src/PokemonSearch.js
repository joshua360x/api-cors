import { useState } from 'react';
// import { search } from 'superagent';
import Spinner from './Spinner';
import PokemonList from './PokemonList';

export default function PokemonSearch() {
  // you'll need to track your pokemon search results, the loading state, and one form field: name. For this form field, set a real initial values (like 'pikachu') so the form populates with a default value.
  const [search, setSearch] = useState('pi');
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function handlePokemonSubmit(e) {
    e.preventDefault();

    // set the loading state to true
    setIsLoading(true);
    // use fetch to make a request to your netlify pokemon function. Be sure to pass the pokemon name as a query param in the URL
    const response = await fetch(`/.netlify/functions/pokemon?search=${search}`);

    const json = await response.json();

    // put the jsonified data in state and set the loading state to false
    setIsLoading(false);
    setPokemons(json);
  }

  return (
    <section className="pokemon">
      {/* make the fetch on submit */}
      <form onSubmit={handlePokemonSubmit}>
        Search pokedex for a pokemon
        {/* add inputs/labels for city name, state, and country, using all the things we need with react forms. Don't forget to use the value property to sync these up with the default values in react state */}
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} />
        <button>Get pokemon</button>
      </form>
      {/* Make a PokemonList component to import and use here. Use a ternery to display a loading spinner (make a <Spinner /> component for this) if the data is still loading. */}
      {
        isLoading && <Spinner />
      }
      {pokemons.map((pokemon, i) => (
        <PokemonList key={pokemon + i} {...pokemon} />
      ))}
    </section>
  );
}
