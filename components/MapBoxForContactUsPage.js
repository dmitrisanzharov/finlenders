import React, {useEffect} from 'react';
var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

// component imports


const MapBoxForContactUsPage = ({latitude, longitude, zoom}) => {

    mapboxgl.accessToken = 'pk.eyJ1IjoiZG1pdHJpc2Fuemhhcm92IiwiYSI6ImNrdWhwbHNlZTBsMmsycG15a21pemE5NXkifQ.PzZuVF6F-pj4XREVQ951-Q';

    var map; 


    useEffect(()=> {
        var map = new mapboxgl.Map({
            container: 'myMapContactUs',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [longitude, latitude], // starting position
            zoom: zoom // starting zoom
            });
    
            const marker = new mapboxgl.Marker()
                .setLngLat([longitude, latitude])
                .addTo(map);
    
    
        map.addControl(new mapboxgl.NavigationControl());

        map.resize();
      }, [])



    return (
        <div className='map_box-container'>
            <div id="myMapContactUs" className=''></div>
        </div>
    )
}

export default MapBoxForContactUsPage
