import { useState } from 'react';
import BusinessList from './BusinessList';
import Spinner from './Spinner';

export default function YelpSearch() {
  // you'll need to track your yelp search results, the loading state, and a form field for location with a default value.
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState('portland or usa');
  const [businessARR, setBusinessARR] = useState([]);

  async function handleYelpSubmit(e) {
    e.preventDefault();

    // set the loading state to true
    setIsLoading(true);
    // use fetch to make a request to your netlify yelp function. Be sure to pass the search query as a query param in the URL
    const response = await fetch(`/.netlify/functions/yelp?search=${location}`);

    // put the jsonified data in state and set the loading state to false
    const json = await response.json();
    console.log('🚀 ~ file: YelpSearch.js ~ line 18 ~ handleYelpSubmit ~ json', json.businesses);
    setIsLoading(false);
    setBusinessARR(json.businesses);
  }

  return (
    <section className="yelp">
      {/* make the fetch on submit */}
      <form onSubmit={handleYelpSubmit}>
        Search yelp for a city

        {/* add inputs/labels for city name, state, and country, using all the things we need with react forms. Don't forget to use the value property to sync these up with the default values in react state */}
        <input type="text" value={location} onChange={e => setLocation(e.target.value)} />
        <button>Search yelp</button>
      </form>
      {
        isLoading && <Spinner />
      }
      {/* Make a BusinessesList component to import and use here. Use a ternery to display a loading spinner (make a <Spinner /> component for this) if the data is still loading. */}
      {
        businessARR.map((business, i) => <BusinessList key={business.alias + i} {...business} />)
      }
    </section>
  );
}
