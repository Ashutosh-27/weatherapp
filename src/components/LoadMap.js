import React from 'react'
import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps"
require('dotenv').config();

const MAP_API_KEY = process.env.REACT_APP_MAP_API_KEY


function LoadMap() {


    let latitude, longitude;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            latitude = position.coords.latitude
            longitude = position.coords.longitude
        });
    }

    function Map() {
        return (
            <GoogleMap defaultZoom={4.5} defaultCenter={{ lat: latitude, lng: longitude }} />

        );
    }



    const WrappedMap = withScriptjs(withGoogleMap(Map));



    

    return (
        <div className="App_Map" >
            <div className='map_container'>
                <WrappedMap
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${MAP_API_KEY }`}
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `300px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />
            </div>
        </div>
    );
}

export default LoadMap
