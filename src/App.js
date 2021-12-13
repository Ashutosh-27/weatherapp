import './App.css';

import LoadMap from './components/LoadMap';
import Weather from './components/Weather';
import Forex from './components/Forex';

import { useEffect } from 'react'
import { useState } from 'react'

function App() {

  

  

  


    return (
      <div className="App" >
        <div className="Section_1">
          <Weather />
        </div>
        <div className="Section_2">
          <LoadMap />
          <Forex />
        </div>
      </div>
    );
  }

  export default App;
