import React, { useMemo, useContext } from 'react';
import TinderCard from 'react-tinder-card';
import StarRatings from 'react-star-ratings';
import { RestaurantsContext, BestContext, DoneContext } from '../App';

const alreadyRemoved = new Set();

function Restaurants () {
  const { best, setBest } = useContext(BestContext);
  const { restaurants, setRestaurants } = useContext(RestaurantsContext);
  const { done, setDone } = useContext(DoneContext);

  const childRefs = useMemo(() => Array(restaurants.length).fill(0).map(i => React.createRef()), [restaurants.length]);

  const swiped = (idToDelete) => {
    alreadyRemoved.add(idToDelete);
    console.log('[swiped]');
  }
  
  
  const handleCardLeftScreen = (dir,restaurant_info) => {
    // Assign best restaurant candidate on first pass
    if (dir === 'right' && !best) {
      console.log('=== BEST NOT SET ===');
      setBest(restaurant_info);
    }
    // Overrides current best restaurant, completes exploration
    if (dir === 'right' && best) {
      console.log('=== BEST SET ===');
      setBest(restaurant_info)
      setDone(true);
    }    
    // Assign best restaurant to last index when none chosen
    if (restaurants.length === 1) {
      if (!best) setBest(restaurant_info);
      setDone(true);
    }
    console.log('[handleCardLeftScreen] - dir:', dir);
    console.log('[handleCardLeftScreen] - best:', best);
    console.log('[handleCardLeftScreen] - done:', done);

    //console.log('[handleCardLeftScreen] - alreadyRemoved:', alreadyRemoved);
    setRestaurants(restaurants.filter(restaurant => !alreadyRemoved.has(restaurant.id)));
    //console.log('[handleCardLeftScreen] - restaurants:', restaurants);
  }
  

  const swipe = async (dir) => {
    let cardsLeft = restaurants.filter(restaurant => !alreadyRemoved.has(restaurant.id))
    if (cardsLeft.length) {
      const toBeRemoved = cardsLeft[cardsLeft.length - 1].id // Find the card object to be removed
      const index = restaurants.map(restaurant => restaurant.id).indexOf(toBeRemoved) // Find the index of which to make the reference to
      alreadyRemoved.add(toBeRemoved) // Make sure the next card gets removed next time if this card do not have time to exit the screen
      await childRefs[index].current.swipe(dir) // Swipe the card!      
    }
    console.log('[swipe]');
  }
  

  return (
    <div>
      <link href='https://fonts.googleapis.com/css?family=Damion&display=swap' rel='stylesheet' />
      <link href='https://fonts.googleapis.com/css?family=Alatsi&display=swap' rel='stylesheet' />
      <div className='cardContainer'>
        {restaurants.map((restaurant, index) =>
          <TinderCard 
            ref={childRefs[index]} 
            className='swipe' 
            key={restaurant.id} 
            preventSwipe={['up','down']} 
            onSwipe={() => swiped(restaurant.id)}
            onCardLeftScreen={(dir) => handleCardLeftScreen(dir,restaurant)}>
            <div className='card'>
              <div style={{ backgroundImage: 'url(' + restaurant.image_url + ')' }} className='cardThumbnail'></div>
              <div className='cardDetails'>
                <h2 className='restaurantName' onClick={()=> window.open(`${restaurant.url}`, "_blank")}>{restaurant.name}</h2>
                <div>
                <StarRatings
                  rating={ restaurant.rating }
                  starRatedColor='rgb(220, 57, 28)'
                  starDimension='20px'
                  starSpacing='0'
                  name='rating'
                />
                 <span className='reviewCount'>{ restaurant.review_count } reviews</span>
                </div>
                <div className='categories'>
                  { restaurant.categories.map(r => r.title).join(', ') }
                </div>
              </div>
            </div>
          </TinderCard>
        )}
      </div>
      <div className='buttons'>
        <button className='discard-button' onClick={() => swipe('left')}>Discard</button>
        <button className='keep-button' onClick={() => swipe('right')}>Keep</button>
      </div>
    </div>
  )
}

export default Restaurants