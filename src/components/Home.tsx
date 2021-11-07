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
} from "@chakra-ui/react";
import { Card } from "@components/design/Card";
import {
  searchSchoolDistricts,
  searchSchools,
  NCESDistrictFeatureAttributes,
  NCESSchoolFeatureAttributes,
} from "@utils/nces";

const Home: React.FC = () => {
  const [searching, setSearching] = useState(false); //for loading
  const [districtSearch, setDistrictSearch] = useState<
    NCESDistrictFeatureAttributes[] //district search
  >([]);
  const [schoolSearch, setSchoolSearch] = useState<
    NCESSchoolFeatureAttributes[] //school search
  >([]);



  const [userDistrictInput, setUserDistrictInput] = useState("");

  
  const handleDistrictClick = async (event: any) => {
    event.preventDefault();
    if (!userDistrictInput) {
      console.log("error - form required");
    } else {
      setSearching(true);
      console.log("in handleDistrictClick, searching:", userDistrictInput);

      //updated paste from demo
      const demoDistrictSearch = await searchSchoolDistricts(
        // "Peninsula School District" (demo data)
        userDistrictInput //user input variable

      );
      setDistrictSearch(demoDistrictSearch);
      console.log("List of district responses", demoDistrictSearch);
  
      const demoSchoolSearch = await searchSchools(
        "k",
        demoDistrictSearch[0].LEAID
      );
      setSchoolSearch(demoSchoolSearch);
     

      console.log("List of associated", demoSchoolSearch);

   //updated 

    }
    setSearching(false);
  };

  return (
    <Center padding="100px" height="90vh">
      <ScaleFade initialScale={0.9} in={true}>
        <Card variant="rounded" borderColor="blue">
          <Heading align="center" textTransform="uppercase" fontWeight="600">
            School Data Finder
          </Heading>
          <Text fontWeight="300">
            Welcome to my little search function!
            <br />
            I didn't know Chakra before I started this, so I thought I'd give it
            a shot...since I love learning and getting better and am even
            willing to get out of my comfort zone and do this during a big coding
            challenge
            <br />
          </Text>
          <Divider style={{ margin: "10px 0" }} />
         

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
            <UnorderedList>
              {districtSearch.map((result) => (
                <ListItem fontWeight="200" key={result.NAME}>
                  {result.NAME}
                </ListItem>
              ))}
            </UnorderedList>
          </Text>


          <Text fontWeight="400">
            {searching ? <Spinner /> : <></>}
            {!searching && schoolSearch.length < 1 ? (
              <></>
            ) : (
              <Text className="schoolResultsTitle">{schoolSearch.length} School Results</Text>
            )}
            {/* {schoolSearch.length} Demo Schools! */}
            <br />
            <UnorderedList>
              {schoolSearch.map((result) => (
                <ListItem fontWeight="200" key={result.NAME}>
                  {result.NAME}
                </ListItem>
              ))}
            </UnorderedList>
          </Text>



        </Card>
      </ScaleFade>
    </Center>
  );
};

export default Home;
