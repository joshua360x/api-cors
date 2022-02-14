# React Yelp, Pokemon, Weather Search Hub

### Some things to note
- For _reasons_, we often cannot hit third-party APIs from the front end. We need Node servers to do that work for us.
- Netlify lets us host tiny node servers for this purpose. They will live in a folder called `functions`.
- We need the netlify cli installed to get this working. It's a hassle, but it's still the easiest way to get node servers spun up.
- `npm run dev` will run your app and its netlify functions

<img width="1225" alt="image" src="https://user-images.githubusercontent.com/16160135/153691679-bf6778b6-8bc9-4fa3-9dfc-51193b0abbe5.png">

### API documentation for third-party APIs:
- [Pokedex API](https://pokedex-alchemy.herokuapp.com/) 
    - Among other features, returns pokemon data given a `name` string to search by.
- [Yelp Business Search API Endpoint](https://www.yelp.com/developers/documentation/v3/business_search) 
    - Among other features, returns a list of businesses given a city, state, and country to search by. You will need to sign up for a token.
- [OpenWeather Geocoding API Endpoint (to translate lat/lon from a city, state, and country)](https://openweathermap.org/api/geocoding-api)
    - Takes in a city, state, and country and returns the latitude and longitude for that location. You will need to sign up for a token.
- [OpenWeather Forecast API Endpoint (to get weather data at a particular lat/lon)](https://openweathermap.org/api/one-call-api)
    - Takes in a latitude and longitude and returns weather data for that location. You will need to sign up for a token.

### Documentation for Netlify Functions
[Netlify Functions Playground with Examples](https://functions.netlify.com/playground/)

| User should be able to . . .                                                         |             |
| :----------------------------------------------------------------------------------- | ----------: |
| Visit the deployed app on Netlify, with link in the About section of the Github repo |  **required for grading** |

| Events                                                                                |             |
| :----------------------------------------------------------------------------------- | ----------: |
| On clicking the search button for pokemon, the correct pokemon data shows on the screen for the pokemon name the user typed | 1|
| On clicking the search button for pokemon, the correct pokemon data shows on the screen for the city, state, and country the user typed | 1|
| On clicking the search button for weather, the correct pokemon data shows on the screen for the city, state, and country the user typed | +1 bonus|


| Components                                                                                |             |
| :----------------------------------------------------------------------------------- | ----------: |
| `App()` : simply imports and calls`<PokemonSearch />`,  `<YelpSearch />`, and `<WeatherSearch />` |1|
| `Spinner()` : a simple, reusable loading spinner for use throughout the app |1|
| `PokemonSearch()` : contains the form and, makes the fetch in a click handler, and passes the pokemon data to the `<PokemonList />` component, showing a loading spinner if the loading state is true |1|
| `PokemonList({ pokemon })` : Takes in an displays an array of pokemon |1|
| `YelpSearch()`:  contains the form and, makes the fetch in a click handler, and passes the yelp data to the `<BusinessesList />` component, showing a loading spinner if the loading state is true |1|
| `BusinessesList({ businesses })` : Takes in an displays an array of business |1|
| `WeatherSearch()`:  contains the form and, makes the fetch in a click handler, and passes the pokemon data to the `<WeatherList />` component, showing a loading spinner if the loading state is true | +1 bonus|
| `WeatherList({ weatherData })` : Takes in an displays an array of weather items |+1 bonus|


| Endpoints                                                                                |             |
| :----------------------------------------------------------------------------------- | ----------: |
| `pokemon.js` : accepts a `name` query parameters in the URL and uses that to fetch and return data from the pokedex api for that string |1|
| `yelp.js` : accepts `city`, `state`, and `country`, query parameters in the URL and uses that to fetch and return business data from the yelp api for that location |1|
| `weather.js` : accepts `city`, `state`, and `country`, query parameters in the URL and uses that to fetch and return weather data from the weather. api for that location. This is a tough one: the weather API requires lat/lon, not a city name. That means you'll need to hit TWO third-party APIs here, one to get the lat/lon given a city, state, and country, and a second one that returns weather for a lat/lon, once you've figured out the lat lon. |+1 bonus|
