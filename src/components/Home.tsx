import React, { useEffect } from "react";
import {
  Button,
  Center,
  Heading,
  Text,
  Icon,
  Input,
  ScaleFade,
  OrderedList,
  Divider,
  ListItem,
  Spinner,
  InputGroup, // Some Chakra components that might be usefull
  HStack,
  VStack,
  InputRightAddon,
} from "@chakra-ui/react";
import { Card } from "@components/design/Card";
import {
  searchSchoolDistricts,
  searchSchools,
  NCESDistrictFeatureAttributes,
  NCESSchoolFeatureAttributes,
} from "@utils/nces";

const Home: React.FC = () => {
  const [searching, setSearching] = React.useState(false);
  const [districtSearch, setDistrictSearch] = React.useState<
    NCESDistrictFeatureAttributes[]
  >([]);
  const [schoolSearch, setSchoolSearch] = React.useState<
    NCESSchoolFeatureAttributes[]
  >([]);

  const demo = async () => {
    // see console for api result examples

    setSearching(true);
    const demoDistrictSearch = await searchSchoolDistricts(
      "Peninsula School District"
    );
    setDistrictSearch(demoDistrictSearch);
    console.log("District example", demoDistrictSearch);

    const demoSchoolSearch = await searchSchools(
      "k",
      demoDistrictSearch[1].LEAID
    ); //school ID number??
    setSchoolSearch(demoSchoolSearch);
    console.log("School Example", demoSchoolSearch);
    setSearching(false);
  };

  useEffect(() => {
    demo();
  }, []);

  return (
    <Center padding="100px" height="90vh">
      <ScaleFade initialScale={0.9} in={true}>
        <Card variant="rounded" borderColor="blue">
          <Heading>School Data Finder</Heading>
          <Text>Welcome to my little search function! My own site is {" "}
            <a href="https://www.chrismochinski.com" target="_blank">
               <b>HERE</b>.
            </a>{" "}
            I didn't know Chakra before I started this, so I thought I'd give it a shot!<br />
            <OrderedList>
              <ListItem>Search for a district</ListItem>
              <ListItem>
                Search for a school within the district (or bypass district
                filter)
              </ListItem>
              <ListItem>View all returned data in an organized way</ListItem>
            </OrderedList>
          </Text>
          <Divider margin={4} />
          <Text>
            Check the console for example of returned data. <b>Happy coding!</b>
            <br />
            {searching ? <Spinner /> : <></>}
            <br />
            {districtSearch.length} Demo Districts!
            <br />
            District response:
           
          </Text>
        </Card>
      </ScaleFade>
    </Center>
  );
};

export default Home;
