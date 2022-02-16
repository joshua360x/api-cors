const fetch = require('node-fetch');
const querystring = require('querystring');
require('dotenv').config();

exports.handler = async (event, context) => {
  try {
    const formData = JSON.parse(event.body);
    // grab the city, state, and country from the request's query parameters
    // here is an example from the netlify docs:
    // https://functions.netlify.com/playground/#hello%2C-%7Bname%7D
    const response = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${formData.city},${formData.state},${formData.country}&limit=&appid=8041ec40a57a39496481f160dc653911`
    );

    const json = await response.json();
    console.log('🚀 ', json);

    // tragicly, we cannot just pass the city name to this API. it wants a latitude and longitude for the weather
    // consult the yelp docs to figure out how to use a city, state, and country to make a request and get the latitude and longitude
    // https://openweathermap.org/api/geocoding-api

    // once you have gotten the lat/lon using the geocoding api, use the lat/lon to get the weather. Consult the docs below:
    // https://openweathermap.org/api/one-call-api

    return {
      statusCode: 200,
      // this is where you shoot data back to the user. right now it's sending an empty object--replace this with the weather data. remember, you do need to stringify it, otherwise netlify gets mad. ¯\_(ツ)_/¯
      body: JSON.stringify(json),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed fetching data' }),
    };
  }
};
