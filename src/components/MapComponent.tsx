import { useEffect, useState } from "react";

import { SlideFade } from "@chakra-ui/react";
import { Card } from "@components/design/Card";
import { googleMapsKey } from "@utils/maps";

import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
} from "@react-google-maps/api";

// map prop type assignment
type mapProps = { 
  lat?: number;
  lon?: number;
};

const MapComponent: React.FC<mapProps> = ({ lat, lon }) => {

  // size of map
  const containerStyle = {
    width: "250px",
    height: "250px",
  };

  // set center of map (this is what will center/appear by default)
  const center = {
    lat: lat,
    lng: lon,
  };

  return (
    <>
      <SlideFade offsetY="20px" in={true}>
        <LoadScript googleMapsApiKey={googleMapsKey}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
          >
            <Marker position={center} clickable={true}></Marker>
          </GoogleMap>
        </LoadScript>
      </SlideFade>
    </>
  );
};

export default MapComponent;
