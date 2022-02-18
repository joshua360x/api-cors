const fetch = require('node-fetch');
// const querystring = require('querystring');
require('dotenv').config();

exports.handler = async (event) => {

  try {
    // const formData = JSON.parse(event.body);
    // grab the city, state, and country from the request's query parameters
    // here is an example from the netlify docs:
    // https://functions.netlify.com/playground/#hello%2C-%7Bname%7D
    // const response = await fetch(
    //   `http://api.openweathermap.org/geo/1.0/direct?q=${formData.city},${formData.state},${formData.country}&limit=&appid=${process.env.WEATHER_KEY}`
    // );

    // const json = await response.json();
    // console.log('🚀 ~ file: weather.js ~ line 16 ~ exports.handler= ~ json', json);
    // console.log(json[0].lat);
    // console.log(json[0].lon);

    // const latitude = json[0].lat;
    // const longitude = json[0].lon;

    const weatherResponse = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${event.queryStringParameters.lat}&lon=${event.queryStringParameters.lon}&units=imperial&appid=${process.env.WEATHER_KEY}`
    );


    const jsonWeather = await weatherResponse.json();

    // tragicly, we cannot just pass the city name to this API. it wants a latitude and longitude for the weather
    // consult the yelp docs to figure out how to use a city, state, and country to make a request and get the latitude and longitude
    // https://openweathermap.org/api/geocoding-api

    // once you have gotten the lat/lon using the geocoding api, use the lat/lon to get the weather. Consult the docs below:
    // https://openweathermap.org/api/one-call-api

    return {
      statusCode: 200,
      // this is where you shoot data back to the user. right now it's sending an empty object--replace this with the weather data. remember, you do need to stringify it, otherwise netlify gets mad. ¯\_(ツ)_/¯
      body: JSON.stringify(jsonWeather),
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed fetching data' }),
    };
  }
};
