import React from 'react';

export default function BusinessList({ name, image_url, rating }) {
  return <div className='business'>
    <p>{name}</p>
    <img className='business-img' src={image_url} alt={name} />
    <p>{rating} out of 5</p>
  </div>;
}
