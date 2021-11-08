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
  InputGroup,
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
  // state of searching for district or school - controls such aspects as spinner and headline results
  const [searchingDistrict, setSearchingDistrict] = useState(false);
  const [searchingSchool, setSearchingSchool] = useState(false);

  // initial search states for appending district and school headlines
  const [initialDistrictSearch, setInitialDistrictSearch] = useState(false);
  const [initialSchoolClick, setInitialSchoolClick] = useState(false);

  const [districtSearch, setDistrictSearch] = useState<
    NCESDistrictFeatureAttributes[]
  >([]); // district search
  const [schoolSearch, setSchoolSearch] = useState<
    NCESSchoolFeatureAttributes[]
  >([]); // school search

  const [userDistrictInput, setUserDistrictInput] = useState(""); // user search input
  const [schoolSelection, setSchoolSelection] = useState<NCESSchoolFeatureAttributes>({}); // user selection of school 
  const [schoolSelected, setSchoolSelected] = useState(false); // bool - determines whether we display map

  const handleSearchClick = async (event: any) => {
    event.preventDefault();
    setInitialSchoolClick(false);
    setSchoolSelected(false); //has a school been selected? If false, clear details (right column)
    setSchoolSearch([]); //clear school search array (middle column)
    setSchoolSelection({});
    if (!userDistrictInput) {
      // would prefer to add a more elegant error approach on blank input
      return;
    } else {
      setSearchingDistrict(true);
      const commitDistrictSearch = await searchSchoolDistricts(
        userDistrictInput //user input
      );
      setDistrictSearch(commitDistrictSearch);
    }
    districtResultHeader();
    setSearchingDistrict(false); //district search is complete
    setInitialDistrictSearch(true); //initial district search is complete - this remains true - a search HAS occurred
  };

  // when selecting a district from the list from which to get list of schools
  const handleDistrictSelect = async (selectedDistrict: string) => {
    setSchoolSelected(false);
    setSearchingSchool(true);
    const commitSchoolSearch = await searchSchools("", selectedDistrict); 
    // would like to append an additional narrow school search
    setSchoolSearch(commitSchoolSearch);
    setSearchingSchool(false);
    setInitialSchoolClick(true);
  };

  const districtResultHeader = () => {
    // builds the DISTRICT RESULTS header based on search results
    if (!initialDistrictSearch && 0 === districtSearch.length) {
      // show nothing if NO init search and array empty
      return;
    } else if (initialDistrictSearch && 0 === districtSearch.length) {
      // show no results if YES init search & array empty
      return `No Results for "${userDistrictInput}".`;
    } else if (1 === districtSearch.length) {
      // if one response
      return `1 District Result for "${userDistrictInput}"`;
    } else if (100 < districtSearch.length) {
      //too many results = please narrow search
      return (
        <Text className="too-many-results-header">
          Too Many Results
          <br />{" "}
          <span style={{ fontSize: "16px" }}>Please Narrow Your Search</span>
        </Text>
      );
      return;
    } else {
      return `${districtSearch.length} District Results for "${userDistrictInput}"`; //search complete, mult results
    }
  };

  const schoolResultsHeader = () => {
    // builds the SCHOOL RESULTS header based on which district is clicked & result
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

  // school list item clicked
  const displayExtraInfo = (selectedObject: NCESSchoolFeatureAttributes) => {
    console.log(selectedObject);
    setSchoolSelected(true);
    console.log("Latitude:", selectedObject.LAT);
    console.log("Longitude:", selectedObject.LON);
    setSchoolSelection(selectedObject);
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

            {/* FORM: strictly for user input of a district  */}
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

            {/* GRID, three columns: districts, schools, more info/map */}
            {/* Rows are basic responsive on screen collapse (250px min each) */}
            <SimpleGrid minChildWidth="250px" columns={3} spacing={8}>
              {/* Box 1 - left side - district results */}
              <Box className="boxLeft">
                <Text fontWeight="400">
                  {searchingDistrict ? <Spinner /> : <></>}
                </Text>
                <Text>{districtResultHeader()}</Text>

                <br />

                {100 < districtSearch.length ? ( //over 100 results = don't render list
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

              {/* Box 2 - center - school results */}
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

              {/* Box 3 - right side - more info */}
              <Box className="boxRight">
                <DetailsComponent
                  lat={schoolSelection.LAT!}
                  lon={schoolSelection.LON!}
                  name={schoolSelection.NAME}
                  street={schoolSelection.STREET}
                  city={schoolSelection.CITY}
                  state={schoolSelection.STATE}
                  zip={schoolSelection.ZIP}
                  county={schoolSelection.NMCNTY}
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
