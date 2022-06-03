import React, { useState , useRef } from "react";
import "../css/main.css";
import {MdLocationPin} from 'react-icons/md'
import {useJsApiLoader, GoogleMap, Marker, Autocomplete, DirectionsRenderer} from '@react-google-maps/api'

const center={lat: 28.6139, lng:77.2090}

const libraries = ['places']

export default function Main() {


  const{isLoaded}=useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  })

  if (!isLoaded){
    alert('Loading soon..')
  }

  const [directionsResponse, setDirectionResponse]=useState(null)
  const  [distance, setDistance]=useState('')

  const originRef=useRef()

  const destinationRef=useRef()


  async function calculateRoute(){
    if (originRef.current.value===''|| destinationRef.current.value===''){
      return 
    }
    // eslint-disable-next-line no-undef
    const directionService=new google.maps.DirectionsService()
    const results=await directionService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING
    })
    setDirectionResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)

  }

  return (
    <div>
      <div class="heading">
        <center>
          Let's calculate <b>distance</b> from Google maps
        </center>
      </div>

      <div class="new">
        <div class="div1">
          <div class="top">
          <div>
            <div class="box1">
              <p>Origin</p>
              <div class="mm">
                <bb><MdLocationPin color="red" size={30}/></bb>
                <Autocomplete><input type="text" defaultValue="Mumbai"  id="ori"  ref={originRef}/></Autocomplete>
              </div>
            </div>

            <div class="box2">
              <p>Destination</p>
              <div class="mm">
                <bb><MdLocationPin color="red" size={30}/></bb>
                <Autocomplete><input type="text" defaultValue="Delhi" id="dest" ref={destinationRef}/></Autocomplete>
              </div>
            </div>
          </div>

             
          <button type="submit" onClick={calculateRoute}>Calculate</button>
            
          </div>

          <div class="div100">
            <div class="inn1">
              <div class="inn10">Distance</div>
              <div class="inn100">{distance} </div>
            </div>
            <div class="inn2">
              <k>
                The distance between <b>{document.getElementById('ori')!==null && document.getElementById('ori').value}</b> and <b>{document.getElementById('dest')!==null && document.getElementById('dest').value}</b> is <b>{distance}</b>
              </k>
            </div>
          </div>
        </div>

        <div class="div2">
          <div class="square">
            <GoogleMap center={center} zoom={5} mapContainerStyle={{width:'100%', height:'100%'}}
            options={{
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false
            }}>
              <Marker position={center}/>
              {directionsResponse && <DirectionsRenderer directions={directionsResponse}/>}

            </GoogleMap>
          </div>
        </div>
      </div>
    </div>
  );
}
