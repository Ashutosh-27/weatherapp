import React from 'react'
import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps"

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

    const Map_Api_key = 'AIzaSyB0fRpxHXP9-EqbKcH0TVF8BdkYQx3ZTtY'


    

    return (
        <div className="App_Map" >
            <div className='map_container'>
                <WrappedMap
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${Map_Api_key}`}
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `300px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />
            </div>
        </div>
    );
}

export default LoadMap
