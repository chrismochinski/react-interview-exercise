import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
} from "@react-google-maps/api";

type infoProps = {
  lat: number,
  lon: number,
  name: string,
  selection: object,
}

import {Text, Heading} from "@chakra-ui/react";
import {
  searchSchoolDistricts,
  searchSchools,
  NCESDistrictFeatureAttributes,
  NCESSchoolFeatureAttributes,
} from "@utils/nces";

const Map: React.FC<infoProps> = ({ lat, lon, name }) => {

useEffect(() => {
    console.log('selection is:', name, lat, lon)
}, [])

  return (
    <div>
      <Text className="map-heading">{name}</Text>
    
        <Text>{lat} {lon}</Text>
        <br />
        <Text>
        THIS IS PLACEHOLDER TEXT It is a long established fact that a reader
        will be distracted by the readable content of a page when looking at its
        layout. The point of using Lorem Ipsum is that it has a more-or-less
        normal distribution of letters, as opposed to using 'Content here,
        content here', making it look like readable English. Many desktop
        publishing packages and web page editors now use Lorem Ipsum as their
        default model text, and a search for 'lorem ipsum' will uncover many web
        sites still in their infancy. Various versions have evolved over the
        years, sometimes by accident, sometimes on purpose (injected humour and
        the like).
      </Text>
    </div>
  );
};

export default Map;
