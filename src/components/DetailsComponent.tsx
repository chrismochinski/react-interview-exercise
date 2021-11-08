import React, { useEffect, useState } from "react";

type infoProps = {
  lat?: number;
  lon?: number;
  name?: string;
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
  county?: string;
  schoolSelected: boolean;
};

import { Text, ScaleFade } from "@chakra-ui/react";
import { Card } from "@components/design/Card";
import MapComponent from "./MapComponent";

const DetailsComponent: React.FC<infoProps> = ({
  lat,
  lon,
  name,
  street,
  city,
  state,
  zip,
  county,
  schoolSelected,
}) => {
  return (
    <>
      {!schoolSelected ? (
        <></>
      ) : (
        <div>
          <Text className="map-heading">{name}</Text>
          <Text>{street}</Text>

          <Text>
            {city}, {state} {zip}
          </Text>

          <Text>{county}</Text>
          <br />
          <MapComponent lat={lat} lon={lon} />
        </div>
      )}
    </>
  );
};

export default DetailsComponent;
