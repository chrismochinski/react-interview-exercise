import React, { useEffect, useState } from "react";
import { Search2Icon } from "@chakra-ui/icons";

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
  InputRightElement,
  Flex,
  Stack,
} from "@chakra-ui/react";
import { Card } from "@components/design/Card";
import {
  searchSchoolDistricts,
  searchSchools,
  NCESDistrictFeatureAttributes,
  NCESSchoolFeatureAttributes,
} from "@utils/nces";

const Home: React.FC = () => {
  const [searching, setSearching] = useState(false);
  const [districtSearch, setDistrictSearch] = useState<
    NCESDistrictFeatureAttributes[]
  >([]);
  const [schoolSearch, setSchoolSearch] = useState<
    NCESSchoolFeatureAttributes[]
  >([]);

  const [userSchoolInput, setUserSchoolInput] = useState("");
  const [userDistrictInput, setUserDistrictInput] = useState("");

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

  // useEffect(() => { //important for testing!
  //   demo();
  // }, []);

  const handleSchoolClick = (event: any) => {
    event.preventDefault();
    console.log("in handleSchoolClick, searching:", userSchoolInput);
  };

  const handleDistrictClick = (event: any) => {
    event.preventDefault();
    console.log("in handleSchoolClick, search:", userDistrictInput);
  };

  // const handleSchoolClick = React.useCallback((event) => {
  //   event.preventDefault();
  //   console.log("in handleSchoolClick");
  // }, []);

  // const handleDistrictClick = React.useCallback((event) => {
  //   event.preventDefault();
  //   console.log("in handleDistrictClick");
  // }, []);

  return (
    <Center padding="100px" height="90vh">
      <ScaleFade initialScale={0.9} in={true}>
        <Card variant="rounded" borderColor="blue">
          <Heading align="center" textTransform="uppercase" fontWeight="600">
            School Data Finder
          </Heading>
          <Text fontWeight="300" >
            Welcome to my little search function!
            <br />
            I didn't know Chakra before I started this, so I thought I'd give it
            a shot...since I love learning and getting better and am even willing to get out of my comfort zone and do this during a coding chalenge ;)
            <br />
          </Text>
          <Divider style={{ margin: "10px 0" }} />
          <form onSubmit={() => handleSchoolClick(event)}>
            <HStack spacing="24px">
              <InputGroup>
                <Input
                  placeholder="Search Schools"
                  size="md"
                  onChange={(event) => setUserSchoolInput(event.target.value)}
                />

                <InputRightElement
                  children={<Search2Icon color="#0070ac43" />}
                />
              </InputGroup>
              <Button type="submit" size="md" variant="ghost">
                Search
              </Button>
            </HStack>
          </form>

          <Text fontWeight="400">
            {searching ? <Spinner /> : <></>}
            {!searching && schoolSearch.length < 1 ? (
              <Text>Let's search for schools!</Text>
            ) : (
              <Text>{schoolSearch.length} School Results</Text>
            )}
            {/* {schoolSearch.length} Demo Schools! */}
            <br />
            <OrderedList>
              {schoolSearch.map((result) => (
                <ListItem fontWeight="200" key={result.NAME}>
                  {result.NAME}
                </ListItem>
              ))}
            </OrderedList>
          </Text>

          <form onSubmit={() => handleDistrictClick(event)}>
            <HStack spacing="24px">
              <InputGroup>
                <Input
                  placeholder="Search for a District"
                  size="md"
                  onChange={(event) => setUserDistrictInput(event.target.value)}
                />
                <InputRightElement
                  children={<Search2Icon color="#0070ac43" />}
                />
              </InputGroup>
              <Button type="submit" size="md" variant="ghost">
                Search
              </Button>
            </HStack>
          </form>
          <Text fontWeight="400">
            {searching ? <Spinner /> : <></>}

            {!searching && schoolSearch.length < 1 ? (
              <Text>Let's search for districts!</Text>
            ) : (
              <Text>{districtSearch.length} District Results</Text>
            )}

            {/* {districtSearch.length} Demo Districts! */}
            <br />
            <OrderedList>
              {districtSearch.map((result) => (
                <ListItem fontWeight="200" key={result.NAME}>
                  {result.NAME}
                </ListItem>
              ))}
            </OrderedList>
          </Text>
        </Card>
      </ScaleFade>
    </Center>
  );
};

export default Home;
