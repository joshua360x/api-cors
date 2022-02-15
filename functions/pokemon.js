const fetch = require('node-fetch');
require('dotenv').config();


exports.handler = async (event, context) => {
  try {
    // grab the pokemon's name from the request's query parameters
    const response = await fetch(
      `https://pokedex-alchemy.herokuapp.com/api/pokedex?pokemon=${event.queryStringParameters.search}`
    );
    // here is an example from the netlify docs:
    const json = await response.json();
    console.log('🚀 ~ file: pokemon.js ~ line 11 ~ exports.handler= ~ json', json);
    // https://functions.netlify.com/playground/#hello%2C-%7Bname%7D

    // consult the pokedex docs
    // https://pokedex-alchemy.herokuapp.com/

    return {
      statusCode: 200,
      // this is where you shoot data back to the user. right now it's sending an empty object--replace this with the pokemon data. remember, you do need to stringify it, otherwise netlify gets mad. ¯\_(ツ)_/¯
      body: JSON.stringify(json.results),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed fetching data' }),
    };
  }
};
