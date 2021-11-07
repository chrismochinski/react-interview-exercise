import React, { useEffect, useState } from "react";
import { Search2Icon, InfoIcon } from "@chakra-ui/icons";

import Map from "./Map";

import {
  Container,
  Button,
  Center,
  Heading,
  Text,
  Icon,
  Input,
  ScaleFade,
  Divider,
  ListItem,
  Spinner,
  InputGroup, // Some Chakra components that might be usefull
  HStack,
  VStack,
  InputRightAddon,
  UnorderedList,
  InputRightElement,
  Flex,
  Stack,
  Grid,
  SimpleGrid,
  Box,
  IconButton,
} from "@chakra-ui/react";
import { Card } from "@components/design/Card";
import {
  searchSchoolDistricts,
  searchSchools,
  NCESDistrictFeatureAttributes,
  NCESSchoolFeatureAttributes,
} from "@utils/nces";
import { extraInfo } from "@utils/extraInfo"; // for props / separate in case I want to adjust

const Home: React.FC = () => {
  const [searching, setSearching] = useState(false);
  const [districtSearch, setDistrictSearch] = useState<
    NCESDistrictFeatureAttributes[] //district search
  >([]);
  const [schoolSearch, setSchoolSearch] = useState<
    NCESSchoolFeatureAttributes[] //school search
  >([]);

  const [userDistrictInput, setUserDistrictInput] = useState(""); // user input search string
  // const [selectionLat, setSelectionLat] = useState<extraInfo>(); // longitude of selection (this may go away)
  // const [selectionLon, setSelectionLon] = useState<extraInfo>(); // latitude of selection (this may go away)
  const [selection, setSelection] = useState<extraInfo>({}); //when user clicks the icon for more info

  const handleDistrictClick = async (event: any) => {
    event.preventDefault();
    if (!userDistrictInput) {
      console.log("error - form required");
    } else {
      setSearching(true);
      console.log("in handleDistrictClick, searching:", userDistrictInput);

      const demoDistrictSearch = await searchSchoolDistricts(
        userDistrictInput //user input
      );
      setDistrictSearch(demoDistrictSearch);
      console.log("List of district responses:", demoDistrictSearch);

      const demoSchoolSearch = await searchSchools(
        "k",
        demoDistrictSearch[0].LEAID
      );
      setSchoolSearch(demoSchoolSearch);

      console.log("List of associated schools:", demoSchoolSearch);
    }
    resultHeader();
    setSearching(false);
  };

  const resultHeader = () => {
    if (0 === districtSearch.length) {
      return `Let's run a search!`;
    } else if (1 === districtSearch.length) {
      return `1 District Result for "${userDistrictInput}"`;
    } else if (100 < districtSearch.length) {
      console.log("fire error - please narrow search");
      return (
        <Text className="too-many-results-header">
          Too Many Results
          <br />{" "}
          <span style={{ fontSize: "16px" }}>Please Narrow Your Search</span>
        </Text>
      );
      return;
    } else {
      return `${districtSearch.length} results for "${userDistrictInput}"`;
    }
  };

  const displayExtraInfo = (selectedObject: any) => {
    console.log("clicked", selectedObject.NAME);
    if (undefined === selectedObject.LAT || undefined === selectedObject.LON) {
      console.log("sorry - location service unavailable");
    } else {
      console.log("Latitude:", selectedObject.LAT);
      console.log("Longitude:", selectedObject.LON);
      // setSelectionLat(selectedObject.LAT);
      // setSelectionLon(selectedObject.LON);
      setSelection(selectedObject);
    }
  };

  return (
    <Center padding="100px" height="90vh">
      <Container maxW="container.lg">
        <ScaleFade initialScale={0.9} in={true}>
          <Card variant="rounded" borderColor="blue">
            <Heading align="center" textTransform="uppercase" fontWeight="600">
              School Data Finder
            </Heading>

            <Divider style={{ margin: "10px 0" }} />

            <form onSubmit={() => handleDistrictClick(event)}>
              <HStack spacing="24px">
                <InputGroup>
                  <Input
                    placeholder="Search for a District"
                    value={userDistrictInput}
                    size="md"
                    onChange={(event) =>
                      setUserDistrictInput(event.target.value)
                    }
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

            <SimpleGrid columns={2} spacing={10}>
              <Box>
                <Text fontWeight="400">
                  {searching ? <Spinner /> : <></>}

                  <Text>{resultHeader()}</Text>

                  <br />

                  {50 < districtSearch.length ? (
                    <></>
                  ) : (
                    <UnorderedList>
                      {districtSearch.map((result) => (
                        <ListItem fontWeight="200" key={result.NAME}>
                          {result.NAME}{" "}
                          <InfoIcon
                            className="i-icon"
                            color="#DDB94F85"
                            onClick={() => displayExtraInfo(result)}
                          />
                        </ListItem>
                      ))}
                    </UnorderedList>
                  )}
                </Text>
                <br />

                <Text fontWeight="400">
                  {searching ? <Spinner /> : <></>}

                  {(!searching && schoolSearch.length < 1) ||
                  50 < districtSearch.length ? (
                    <></>
                  ) : (
                    <Text className="schoolResultsTitle">
                      {schoolSearch.length} Associated School Results
                    </Text>
                  )}
                  <br />
                  <UnorderedList>
                    {schoolSearch.map((result) => (
                      <ListItem fontWeight="200" key={result.NAME}>
                        {result.NAME}{" "}
                        <InfoIcon
                          color="#DDB94F85"
                          className="i-icon"
                          onClick={() => displayExtraInfo(result)}
                        />
                      </ListItem>
                    ))}
                  </UnorderedList>
                </Text>
              </Box>
              <Box w="100%">
                <Map
                  lat={selection.LAT}
                  lon={selection.LON}
                  name={selection.NAME}
                />
              </Box>
            </SimpleGrid>
          </Card>
        </ScaleFade>
      </Container>
    </Center>
  );
};

export default Home;
