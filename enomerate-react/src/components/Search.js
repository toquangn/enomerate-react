import React, { useState, useContext } from 'react'
import { RestaurantsContext } from '../App';
import Slider from 'react-input-slider';

function Search () {
  const { setRestaurants } = useContext(RestaurantsContext)

  const [status, setStatus] = useState(null);
  const [max,setMax] = useState(20);

  function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by your browser');
    } else {
      setStatus('Locating...');
      navigator.geolocation.getCurrentPosition(async (pos) => {
        setStatus(null);
        const res = await fetch(`api/${pos.coords.latitude}/${pos.coords.longitude}/${max}`);
        const data = await res.json();
        shuffle(data);
        setRestaurants(data);
      }, () => {
        setStatus('Unable to retrieve your location');
      });
    }
  }

  return (
    <div>
      <link href='https://fonts.googleapis.com/css?family=Damion&display=swap' rel='stylesheet' />
      <link href='https://fonts.googleapis.com/css?family=Alatsi&display=swap' rel='stylesheet' />
      <div className='cardContainer'> 
          <div className='card'>
            <div className='searchDetails' style={{textAlign:'center'}}>
            <h4 className='searchInstructions'>Amount of places to choose from:</h4>
            <h1 className='maxLabel'>{max}</h1>
            <Slider
              axis="x"
              xstep={10}
              xmin={10}
              xmax={50}
              x={max}
              onChange={({ x }) => setMax(x)}
            />
            </div>
            <h3 className='status'>{status}</h3>
          </div>
      </div>
      <div className='buttons'>
        <button className='search-button' onClick={getLocation}>Search</button>
      </div>
    </div>
  )
}

export default Search