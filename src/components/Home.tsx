import React, { useState } from "react";
import { Search2Icon, InfoIcon } from "@chakra-ui/icons";
import DetailsComponent from "./DetailsComponent";

import {
  Container,
  Button,
  Center,
  Heading,
  Text,
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

const Home: React.FC = () => {
  const [searchingDistrict, setSearchingDistrict] = useState(false); //left box content - search results for districts & schools
  const [searchingSchool, setSearchingSchool] = useState(false); //searing school boolean state

  const [initialDistrictSearch, setInitialDistrictSearch] = useState(false); //did an initial District search happen?
  const [initialSchoolClick, setInitialSchoolClick] = useState(false); //did an initial School click happen?

  const [districtSearch, setDistrictSearch] = useState<
    NCESDistrictFeatureAttributes[]
  >([]); //district search
  const [schoolSearch, setSchoolSearch] = useState<
    NCESSchoolFeatureAttributes[]
  >([]); //school search

  const [userDistrictInput, setUserDistrictInput] = useState(""); //user search input
  const [selection, setSelection] = useState<NCESSchoolFeatureAttributes>({}); //user selection of school
  const [schoolSelected, setSchoolSelected] = useState(false); //determines whether we display map

  const handleSearchClick = async (event: any) => {
    event.preventDefault();
    setInitialSchoolClick(false); 
    setSchoolSelected(false); //has a school been selected? If false, clear details (right column)
    setSchoolSearch([]); //clear school search array (middle column)
    setSelection({});
    if (!userDistrictInput) {
      console.log("error - form required");
      //fix fire error toast
    } else {
      setSearchingDistrict(true);
      console.log("in handleSearchClick, searching:", userDistrictInput);

      const commitDistrictSearch = await searchSchoolDistricts(
        userDistrictInput //user input
      );
      setDistrictSearch(commitDistrictSearch);
      console.log("List of district responses:", commitDistrictSearch);
    }
    districtResultHeader();
    setSearchingDistrict(false); //district search is complete
    setInitialDistrictSearch(true); //initial district search is complete - this remains true - a search HAS occurred
  };

  //when selecting a district from the list from which to get list of schools
  const handleDistrictSelect = async (selectedDistrict: string) => {
    setSchoolSelected(false);
    setSearchingSchool(true);
    console.log("selected:", selectedDistrict);
    const commitSchoolSearch = await searchSchools("k", selectedDistrict);
    console.log("List of associated schools:", commitSchoolSearch);
    setSchoolSearch(commitSchoolSearch);
    setSearchingSchool(false);
    setInitialSchoolClick(true);
  };

  const districtResultHeader = () => {
    // builds the DISTRICT RESULTS header based on search results
    if (!initialDistrictSearch && 0 === districtSearch.length) {
      return;
    } else if (initialDistrictSearch && 0 === districtSearch.length) {
      return `No Results for "${userDistrictInput}".`;
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

  const schoolResultsHeader = () => {
    // builds the SCHOOL RESULTS header based on which district is clicked
    if (!initialSchoolClick && 0 === schoolSearch.length) {
      return;
    } else if (initialSchoolClick && 0 === schoolSearch.length) {
      return `No Associated School Results`;
    } else if (1 === schoolSearch.length) {
      return `1 Associated School Result`;
    } else {
      return `${schoolSearch.length} Associated School Results`;
    }
  };

  const displayExtraInfo = (selectedObject: any) => {
    console.log("clicked", selectedObject.NAME);
    setSchoolSelected(true);
    if (undefined === selectedObject.LAT || undefined === selectedObject.LON) {
      //null check
      console.log("sorry - location service unavailable");
      //fix fire error toast
    } else {
      console.log("Latitude:", selectedObject.LAT);
      console.log("Longitude:", selectedObject.LON);
      setSelection(selectedObject);
    }
    console.log("selection is:", selection);
  };

  return (
    <Center padding="100px 0">
      <Container className="home-container" maxW="container.lg">
        <ScaleFade initialScale={0.9} in={true}>
          <Card variant="rounded" borderColor="blue">
            <Heading align="center" textTransform="uppercase" fontWeight="600">
              School Data Finder!
            </Heading>
            <Text className="subtitle">
              Welcome to our comprehensive school and school district data
              center! Let's get started.
            </Text>

            <Divider style={{ margin: "10px 0" }} />

            <form onSubmit={() => handleSearchClick(event)}>
              <HStack spacing="24px">
                <InputGroup>
                  <Input
                    required
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

            <SimpleGrid minChildWidth="250px" columns={3} spacing={8}>
              <Box className="boxLeft">
                <Text fontWeight="400">
                  {searchingDistrict ? <Spinner /> : <></>}
                </Text>
                <Text>{districtResultHeader()}</Text>

                <br />

                {50 < districtSearch.length ? (
                  <></>
                ) : (
                  <UnorderedList className="ul" listStyleType="none">
                    {districtSearch.map((result) => (
                      <ListItem
                        className="li"
                        key={result.LEAID}
                        onClick={() => handleDistrictSelect(result.LEAID)}
                      >
                        {result.NAME}{" "}
                        <InfoIcon color="#DDB94F85" className="i-icon" />
                      </ListItem>
                    ))}
                  </UnorderedList>
                )}
                <br />
              </Box>

              <Box className="boxCenter">
                <Text fontWeight="400">
                  {searchingSchool ? <Spinner /> : <></>}
                </Text>

                <Text>{schoolResultsHeader()}</Text>

                <br />
                <UnorderedList className="ul" listStyleType="none">
                  {schoolSearch.map((result) => (
                    <ListItem
                      key={result.NAME}
                      className="li"
                      onClick={() => displayExtraInfo(result)}
                    >
                      {result.NAME}{" "}
                      <InfoIcon color="#DDB94F85" className="i-icon" />
                    </ListItem>
                  ))}
                </UnorderedList>
              </Box>
              <Box className="boxRight">
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
