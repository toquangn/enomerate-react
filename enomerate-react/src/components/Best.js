import React, { useContext } from 'react'
import StarRatings from 'react-star-ratings'
import { BestContext } from '../App'

function Best () {

  const { best } = useContext(BestContext)

  return (
    <div>
      <link href='https://fonts.googleapis.com/css?family=Damion&display=swap' rel='stylesheet' />
      <link href='https://fonts.googleapis.com/css?family=Alatsi&display=swap' rel='stylesheet' />
      <div className='cardContainer'> 
          <div className='card'>
            <div style={{ backgroundImage: 'url(' + best.image_url + ')' }} className='cardThumbnail'></div>
            <div className='cardDetails'>
              <h2 className='restaurantName' onClick={()=> window.open(`${best.url}`, "_blank")}>{best.name}</h2>
              <div>
              <StarRatings
                rating={ best.rating }
                starRatedColor='rgb(220, 57, 28)'
                starDimension='20px'
                starSpacing='0'
                name='rating'
              />
                <span className='reviewCount'>{ best.review_count } reviews</span>
              </div>
              <div className='categories'>
                { best.categories.map(r => r.title).join(', ') }
              </div>
            </div>
          </div>
      </div>
    </div>
  )
}

export default Best