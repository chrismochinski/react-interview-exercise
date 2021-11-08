import React, { useEffect, useState } from "react";
import { Search2Icon, InfoIcon } from "@chakra-ui/icons";
import DetailsComponent from "./DetailsComponent";

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
  UnorderedList,
  InputRightElement,
  SimpleGrid,
  Box,
} from "@chakra-ui/react";
import { Card } from "@components/design/Card";

import {
  searchSchoolDistricts,
  searchSchools,
  NCESDistrictFeatureAttributes,
  NCESSchoolFeatureAttributes,
} from "@utils/nces";

import { parentProps } from "@utils/props";

const Home: React.FC = () => {
  const [searchingDistrict, setSearchingDistrict] = useState(false); //left box content - search results for districts & schools
  const [searchingSchool, setSearchingSchool] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false); //fix
  
  const [searchingForDetails, setSearchingForDetails] = useState(false); //right box - getting details on user select
  const [districtSearch, setDistrictSearch] = useState<
    NCESDistrictFeatureAttributes[]
  >([]); //district search
  const [schoolSearch, setSchoolSearch] = useState<
    NCESSchoolFeatureAttributes[]
  >([]); //school search

  const [userDistrictInput, setUserDistrictInput] = useState(""); //user search input
  const [selection, setSelection] = useState<NCESSchoolFeatureAttributes>({}); //user selection of school
  const [schoolSelected, setSchoolSelected] = useState(false); //determines whether we display map
  // const [districtSelection, setDistrictSelection] = useState<NCESDistrictFeatureAttributes>({});

  const handleSearchClick = async (event: any) => {
    event.preventDefault();
    //fix
    setSchoolSelected(false);
    setSchoolSearch([]);
    setSelection(
      {});
    if (!userDistrictInput) {
      console.log("error - form required");
    } else {
      setSearchingDistrict(true);
      console.log("in handleSearchClick, searching:", userDistrictInput);

      const commitDistrictSearch = await searchSchoolDistricts(
        userDistrictInput //user input
      );
      setDistrictSearch(commitDistrictSearch);
      console.log("List of district responses:", commitDistrictSearch);

    }
    resultHeader();
    setSearchingDistrict(false);
  };

  //when selecting a district from the list from which to get list of schools
  const handleDistrictSelect = async (selectedDistrict: string) => {
    setSchoolSelected(false)
    setSearchingSchool(true);
    console.log("selected:", selectedDistrict);
    const demoSchoolSearch = await searchSchools(
      "k",
      selectedDistrict
    );
    console.log("List of associated schools:", demoSchoolSearch);
    setSchoolSearch(demoSchoolSearch);
  setSearchingSchool(false);
  };

  const resultHeader = () => {
    // builds the header based on search results
    if (0 === districtSearch.length) {
      return;
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
      return `${districtSearch.length} District Results for "${userDistrictInput}"`;
    }
  };

  const displayExtraInfo = (selectedObject: any) => {
    console.log("clicked", selectedObject.NAME);
    setSchoolSelected(true);
    if (undefined === selectedObject.LAT || undefined === selectedObject.LON) { //null check
      console.log("sorry - location service unavailable");
    } else {
      console.log("Latitude:", selectedObject.LAT);
      console.log("Longitude:", selectedObject.LON);
      setSelection(selectedObject);
    }
    console.log('selection is:', selection)
  };

  return (
    <Center padding="100px 0">
      <Container className="home-container" maxW="container.lg">
        <ScaleFade initialScale={0.9} in={true}>
          <Card variant="rounded" borderColor="blue">
            <Heading align="center" textTransform="uppercase" fontWeight="600">
              School Data Finder
            </Heading>

            <Divider style={{ margin: "10px 0" }} />

            <form onSubmit={() => handleSearchClick(event)}>
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

            <SimpleGrid minChildWidth="270px" columns={3} spacing={6}>
              <Box>
                <Text fontWeight="400">{searchingDistrict ? <Spinner /> : <></>}</Text>
                <Text>{resultHeader()}</Text>

                <br />

                {50 < districtSearch.length ? (
                  <></>
                ) : (
                  <UnorderedList>
                    {districtSearch.map((result) => (
                      <ListItem
                        fontWeight="200"
                        key={result.LEAID}
                        onClick={() => handleDistrictSelect(result.LEAID)}
                        style={{ cursor: "pointer" }}
                      >
                        {result.NAME}<InfoIcon
                        color="#DDB94F85"
                        className="i-icon"
                      />
                      </ListItem>
                    ))}
                  </UnorderedList>
                )}
                <br />
              </Box>


              <Box>
                <Text fontWeight="400">{searchingSchool ? <Spinner /> : <></>}</Text>

                {50 < districtSearch.length ? (
                  // fix
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
              </Box>
              <Box w="100%">
                <DetailsComponent
                  lat={selection.LAT!}
                  lon={selection.LON!}
                  name={selection.NAME}
                  street={selection.STREET}
                  city={selection.CITY}
                  state={selection.STATE}
                  zip={selection.ZIP}
                  county={selection.NMCNTY}
                  schoolSelected={schoolSelected}
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
