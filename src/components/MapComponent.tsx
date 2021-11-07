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

type mapProps = {
  //props items
  lat: number;
  lon: number;
};

const MapComponent: React.FC<mapProps> = ({ lat, lon }) => {


  const containerStyle = {
    width: "300px",
    height: "300px",
  };

  const center = {
    lat: lat,
    lng: lon,
  };

  return (
    <>
          <SlideFade offsetY="20px" in={true}>

      <LoadScript googleMapsApiKey={googleMapsKey}>
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
          <Marker
        position={center}
        clickable={true}
        // draggable={true}
      ></Marker>
        </GoogleMap>
      </LoadScript>
      </SlideFade>

    </>
  );
};

export default MapComponent;
