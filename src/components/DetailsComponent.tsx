//object props to be used on this page
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
        <></> //render nothing if no school is selected
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
