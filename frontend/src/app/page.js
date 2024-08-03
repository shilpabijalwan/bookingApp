"use client"; // Mark as a client component

import {
  Box,
  Button,
  Heading,
  HStack,
  List,
  ListItem,
  Text,
  VStack,
} from "@chakra-ui/react";
import { goals } from "../constants/homepage";

export default function Home({ Components, pageProps }) {
  return (
    <Box border={"1px solid blue"} mt={10} m={"30"}>
      <Box mb={10}>
        <Heading fontSize={{ base: 20, md: 26, lg: 60 }}>
          be kind to your self ,
        </Heading>
        <Heading
          fontSize={{ base: 20, md: 26, lg: 60 }}
          color={"#F79D5C"}
          className="HomeTextColor"
        >
          Do yoga every day.
        </Heading>
      </Box>
      <VStack spacing={5} align="start" ml={30}>
        <ul spacing={4} p={0} m={0}>
          {goals.map((ele, index) => (
            <Box as="li" key={index} mb={4} fontSize={18}>
              {ele}
            </Box>
          ))}
        </ul>
      </VStack>

      <HStack spacing={5}>
        <Button style={{ background: "#F79D5C", color: "white" }}>
          become a member
        </Button>
        <Button style={{ color: "#F79D5C" }}>exprole classes</Button>
      </HStack>
    </Box>
  );
}
