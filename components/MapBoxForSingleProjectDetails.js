import React, {useEffect} from 'react';
var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

const MapBoxForSingleProjectDetails = ({latitude, longitude}) => {

    mapboxgl.accessToken = 'pk.eyJ1IjoiZG1pdHJpc2Fuemhhcm92IiwiYSI6ImNrdWhwbHNlZTBsMmsycG15a21pemE5NXkifQ.PzZuVF6F-pj4XREVQ951-Q';

    var map; 


    useEffect(()=> {
        var map = new mapboxgl.Map({
            container: 'myMap',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [longitude, latitude], // starting position
            zoom: 10 // starting zoom
            });
    
            const marker = new mapboxgl.Marker()
                .setLngLat([longitude, latitude])
                .addTo(map);
    
    
        map.addControl(new mapboxgl.NavigationControl());
      }, [])



    return (
        <div>
            <div id="myMap" className='mapBoxForSingleProjectDetailsHeightAndWidth'></div>
        </div>
    )
}

export default MapBoxForSingleProjectDetails
