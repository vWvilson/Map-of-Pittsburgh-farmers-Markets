import React, {useState} from 'react';
import ReactMapGL,{Marker,Popup,NavigationControl,GeolocateControl} from 'react-map-gl';
import * as MarketData from "./data/Farmers_Markets.json"

export default function App () {
  const[viewport, setViewport] = useState({
    latitude: 40.4417,
    longitude: -79.99009999999998,
    width: '100vw',
    height:'100vh',
    zoom:12
  })
  const [selectedMarket, setSelectedMarket] = useState(null);

  return (
    
      <React.Fragment>
      
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken ={process.env.REACT_APP_MAPBOX_TOKEN}
      mapStyle = 'mapbox://styles/wvwilson/cjwayseht1gwi1cp6waw4funr'
      onViewportChange = {viewport => {setViewport(viewport)}}>

      <GeolocateControl 
          onViewportChange = {viewport => {setViewport(viewport)}}
          positionOptions={{enableHighAccuracy: true}}
          trackUserLocation={true} />
      <div style={{position: 'absolute', right: 0}}>
      <NavigationControl 
        onViewportChange = {viewport => {setViewport(viewport)}}
        showCompass = {true}
      
      
      />



      </div>
      {MarketData.features.map((market)=> (
        <Marker 
          key ={market.properties.FID}
          latitude ={market.geometry.coordinates[1]}
          longitude ={market.geometry.coordinates[0]}
          >
          <button className="marker-btn" 
          onClick = { e => {
            e.preventDefault();
            setSelectedMarket(market);
          }}>
            <img src="market.svg" alt = "market icon"/>
          </button>
          
        </Marker>
        
      ))}
      {selectedMarket &&(
        <Popup 
        
        latitude = {selectedMarket.geometry.coordinates[1]} 
        longitude ={selectedMarket.geometry.coordinates[0]}
        onClose  = {()=> {
          setSelectedMarket(null);
         }}>

            <div >
              <h2>{selectedMarket.properties.Name}</h2>
              <p>{selectedMarket.properties.Season}</p>
              <p> {selectedMarket.properties.Day_Time}</p>
            </div>

        </Popup>

      )}
     
    </ReactMapGL>
    
    </React.Fragment>
  )
}
