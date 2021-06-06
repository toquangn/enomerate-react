import React, { useState, createContext } from 'react'
import Search from './components/Search'
import Restaurants from './components/Restaurants'
import Best from './components/Best'
import './App.css'

export const RestaurantsContext = createContext();
export const BestContext = createContext();
export const DoneContext = createContext();

function App () {
  const [restaurants,setRestaurants] = useState([]);
  const [best,setBest] = useState(null);
  const [done,setDone] = useState(false);

  return (
    <RestaurantsContext.Provider value={{restaurants,setRestaurants}}>
      <BestContext.Provider value={{best,setBest}}>
        <DoneContext.Provider value={{done,setDone}}>
        <div className='app'>
          {!done ? <h1>Enomerate</h1> : <h1>Your best choice:</h1>}
          {!restaurants.length ? <Search /> :
            (!done ? <Restaurants /> : <Best />)}
        </div>
        </DoneContext.Provider>
      </BestContext.Provider>
    </RestaurantsContext.Provider>
  )
}

export default App