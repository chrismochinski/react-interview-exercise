import React, { useEffect, useState } from "react";


type infoProps = {
  lat: number,
  lon: number,
  name: string,
}

import {Text} from "@chakra-ui/react";
import { Card } from "@components/design/Card";
import MapComponent from "./MapComponent";

const DetailsComponent: React.FC<infoProps> = ({ lat, lon, name }) => {

useEffect(() => {
    console.log('selection is:', name, lat, lon)
}, [])

  return (
    <div>

<Card variant="rounded" border="blue">

      <Text className="map-heading">{name}</Text>
    
        <Text>{lat} {lon}</Text>

        <MapComponent lat={lat} lon={lon}/>

</Card>
    </div>
  );
};

export default DetailsComponent;
