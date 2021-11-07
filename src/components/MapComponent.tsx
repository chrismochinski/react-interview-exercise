import { useEffect } from "react";

import { Container, Button, IconButton, Text } from "@chakra-ui/react";
import { Card } from "@components/design/Card";

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

  useEffect(() => {
      const location = {lat, lon}
  })

  return (
    <>
      <LoadScript googleMapsApiKey="AIzaSyAOBXNFthjOSS9VQZXBlxdqUQzt53LOGUQ">
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
          {/* Child components, such as markers, info windows, etc. */}
        </GoogleMap>
      </LoadScript>

      {/* <Marker
        // position={location}
        clickable={true}
        draggable={true}
      ></Marker> */}
    </>
  );
};

export default MapComponent;
