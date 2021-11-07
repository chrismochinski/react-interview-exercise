import React, { useEffect, useState } from "react";


type infoProps = {
  lat: number,
  lon: number,
  name: string,
  street: string,
  city: string,
  state: string,
  zip: number,
  county: string,
  schoolSelected: boolean
}

import {Text} from "@chakra-ui/react";
import { Card } from "@components/design/Card";
import MapComponent from "./MapComponent";

const DetailsComponent: React.FC<infoProps> = ({ lat, lon, name, street, city, state, zip, county, schoolSelected }) => {


  return (
    <div>

{/* <Card variant="rounded" borderColor="blue"> */}

      <Text className="map-heading">{name}</Text>
    
        <Text>{lat} {lon}</Text>

        {!schoolSelected ? (<Text>Select a School for Map</Text>) : (

        <MapComponent lat={lat} lon={lon}/>

        )}
{/* </Card> */}
    </div>
  );
};

export default DetailsComponent;
