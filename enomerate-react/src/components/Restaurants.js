import React, { useState, useMemo, useContext } from 'react';
import TinderCard from 'react-tinder-card';
import StarRatings from 'react-star-ratings';
import { RestaurantsContext, BestContext, DoneContext } from '../App';

const alreadyRemoved = []

function Restaurants () {
  const [lastDirection, setLastDirection] = useState()

  const { best, setBest } = useContext(BestContext)
  const { restaurants } = useContext(RestaurantsContext)
  const { setDone } = useContext(DoneContext)


  const childRefs = useMemo(() => Array(restaurants.length).fill(0).map(i => React.createRef()), [restaurants])

  const swiped = (direction, nameToDelete) => {
    //console.log('removing: ' + nameToDelete)
    setLastDirection(direction)
    alreadyRemoved.push(nameToDelete)
  }

  const swipe = async (dir) => {
    const cardsLeft = restaurants.filter(restaurant => !alreadyRemoved.includes(restaurant.id))
    if (cardsLeft.length) {
      const toBeRemoved = cardsLeft[cardsLeft.length - 1].id // Find the card object to be removed
      const index = restaurants.map(restaurant => restaurant.id).indexOf(toBeRemoved) // Find the index of which to make the reference to
      alreadyRemoved.push(toBeRemoved) // Make sure the next card gets removed next time if this card do not have time to exit the screen
      await childRefs[index].current.swipe(dir) // Swipe the card!

      // Assign best restaurant candidate on first pass
      if (dir === 'right' && !best) {
        setBest(restaurants[index])
      }
      // Overrides current best restaurant, completes exploration
      if (dir === 'right' && best) {
        setBest(restaurants[index])
        setDone(true);
      }    
      // Assign best restaurant to last index when none chosen
      if (cardsLeft.length === 1) {
        if (!best) setBest(restaurants[index]);
        setDone(true);
      }
    }
  }

  return (
    <div>
      <link href='https://fonts.googleapis.com/css?family=Damion&display=swap' rel='stylesheet' />
      <link href='https://fonts.googleapis.com/css?family=Alatsi&display=swap' rel='stylesheet' />
      <div className='cardContainer'>
        {restaurants.map((restaurant, index) =>
          <TinderCard ref={childRefs[index]} className='swipe' key={restaurant.name} onSwipe={(dir) => swiped(dir, restaurant.name)}>
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
      {lastDirection ? <h2 key={lastDirection} className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText'>Swipe a card or press a button to get started!</h2>}
    </div>
  )
}

export default Restaurants