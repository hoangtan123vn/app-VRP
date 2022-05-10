import './App.css';
import {GoogleMap,useLoadScript,Marker,InfoWindow,Autocomplete } from "@react-google-maps/api"
import {Component, useMemo, useState} from 'react'
import Menu from './components/Menu';
import Profile from './components/Profile';
function Map(){
    const {isLoaded} = useLoadScript({
        googleMapsApiKey:"AIzaSyDXb0JTlirT2NuU6_0Cdy-QAgoGeE2DDvo",
        libraries:["places"],
    });
    
    if(!isLoaded) 
    return (
    <div> Loading ....</div>
    )
    return (
        <>
            <Profile/>
            <Menu/>
            <MyMap />
        </>
    )   

}
function MyMap(){
    const center = useMemo(()=> ({lat :10.7797855,lng :106.6990189}),[]);
    //const [selected,setSelected] = useState('');
    return (
        <>
        {/* <div className ="places-container"> 
        <PlaceAutoComplete SetSelected={setSelected}/>
        </div> */}
        <GoogleMap
        zoom={14}
        center={{lat :10.7797855,lng :106.6990189}}
        mapContainerClassName="map-container"> 
        {/* {selected && <Marker position={selected} />} */}
        </GoogleMap>
        </>
        
    );
}



export default Map