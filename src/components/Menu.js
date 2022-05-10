import React, { useState } from 'react'
import '../App.css';
import usePlacesAutocomplete from 'use-places-autocomplete';
import { Combobox,ComboboxInput,ComboboxPopover,ComboboxList, ComboboxOption } from '@reach/combobox';
import '@reach/combobox/styles.css'
export default function Menu() {
    const [Shipments , Setshipments] = useState('')
    const shipmentChangeHandler = (event) =>{
        Setshipments(event.target.value)
        console.log(event.target.value)
    }
    const [selected,setSelected] = useState('');
    const drawHandler = () =>{
     
    }
    const optimizeHandler = () =>{

    }

    const PlaceAutoComplete = ({SetSelected}) => {
      const {
          ready,
          value,
          setValue,
          suggestions : {status,data},
          clearSuggestions,
      } = usePlacesAutocomplete();
      return <Combobox> 
          <ComboboxInput value ={ value } onChange = {(e)=> setValue(e.target.value)} disabled={!ready}
          className="combobox-input" placeholder='Search an address'/>
          <ComboboxPopover>
              <ComboboxList>
                  {status === "OK" && data.map(({place_id,description}) => <ComboboxOption key={place_id} value={description}/>)}
              </ComboboxList>
          </ComboboxPopover>
      </Combobox>
  }

  return (
       <form type='submit' id="form">
       <div id="floating-panel">
        <div>
        <div id="create-shipment" className='label'> 
        <p className='label'>Add Shipments</p>
        <PlaceAutoComplete setSelected={setSelected} />
        </div>
        </div>

        <div>
          <div id="create-depot" className='label'>
          <p className='label'>Add depot</p>
          <PlaceAutoComplete setSelected={setSelected} />
          </div>
        </div>

        <div>
          <div id="create-vehicle">
            <p className='label'>Add Vehicles</p>
            <input id="optimize_vehicles" type="number" min="1" max="10"/>
          </div>
        </div>

        <div>
          <div>
            <div id="draw-direction">
              <button id="button-draw" type="button">Draw</button>
            </div>
          </div>
        </div>

        <div>
          <div>
            <div id="button-optimize">
              <button id="button-optimize" type="button">Optimize Route</button>
            </div>
          </div>
        </div>
      </div>
       </form>
  )
}
