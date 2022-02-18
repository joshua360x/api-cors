import { useState } from 'react';
import Spinner from './Spinner';
import StatesOption from './StatesOption';
import Weather from './Weather';

export default function WeatherSearch() {
  // you'll need to track your weather search results, the loading state, and a form field for location with a default value.
  const [isLoading, setIsLoading] = useState(false);
  const [weather1, setWeather1] = useState({});
  const [formData, setFormData] = useState({
    city: 'portland',
    state: 'or',
    country: 'usa',
  });

  // const [weatherARR, setWeatherARR] = useState([]);

  async function handleWeatherSubmit(e) {
    e.preventDefault();

    // set the loading state to true
    setIsLoading(true);
    // use fetch to make a request to your netlify weather function. Be sure to pass the location as a query param in the URL

    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(formData),
    };

    const response = await fetch(`/.netlify/functions/weather`, requestOptions);

    const json = await response.json();

    const latitude = json[0].lat;
    const longitude = json[0].lon;
    // console.log('🚀 ~ lat, lon', latitude, longitude);

    const responseWeather = await fetch(
      `/.netlify/functions/trueWeather?lat=${latitude}&lon=${longitude}`
    );

    const jsonWeather = await responseWeather.json();

    // put the jsonified data in state and set the loading state to false
    setIsLoading(false);
    setWeather1(jsonWeather);
  }

  return (
    <section className="weather">
      {/* make the fetch on submit */}
      <form onSubmit={handleWeatherSubmit}>
        Search weather for a city In the US Only
        {/* add inputs/labels for city name, state, and country, using all the things we need with react forms. Don't forget to use the value property to sync these up with the default values in react state */}
        <input
          type="text"
          value={formData.city}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          placeholder="enter city"
        />
        <StatesOption formData={formData} setStateOfUnitedStatesData={setFormData} />
        <button>Get weather</button>
      </form>
      {isLoading && <Spinner />}
      {/* Make a ForecastList component to import and use here. Use a ternery to display a loading spinner (make a <Spinner /> component for this) if the data is still loading. */}
      <Weather {...weather1} />
    </section>
  );
}
