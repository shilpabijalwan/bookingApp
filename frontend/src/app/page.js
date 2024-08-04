"use client"; // Mark as a client component

import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  List,
  ListItem,
  Text,
  VStack,
} from "@chakra-ui/react";
import { goals } from "../constants/homepage";
import UiContainer from "@/components/UiContainer";

export default function Home({ Components, pageProps }) {
  return (
    <UiContainer>
      <Box className="FlexBox">
        <Box p={{ base: 4, md: 14, lg: 30 }}>
          <Heading fontSize={{ base: 24, md: 36, lg: 60 }} className="headings">
            Be kind to your self,
          </Heading>
          <Heading
            className="headings HomeTextColor"
            fontSize={{ base: 24, md: 36, lg: 60 }}
            color={"#F79D5C"}
            mb={10}
          >
            Do yoga every day.
          </Heading>
        </Box>
        <Box
          display={{ base: "block", md: "flex" }}
          w="100%"
          height={{ base: "80vh", md: "auto" }}
          justifyContent="space-between"
        >
          <VStack pl={{ base: 14, md: 16, lg: 14 }} spacing={5} align="start">
            <ul spacing={4} p={0} m={0}>
              {goals.map((ele, index) => (
                <Box as="li" key={index} mb={4}>
                  {ele}
                </Box>
              ))}
            </ul>
          </VStack>
          <Box
            border={"1 px solid blue"}
            w={{ base: "100%", md: "100%", lg: "50%" }}
            height={{ base: "0", md: "300px" }}
          >
            <Image
              src="—Pngtree—hand drawn creative yoga fitness_5337861.png"
              alt="Yoga"
              width={{ base: "100%", md: "60%" }}
              m="auto"
            />
          </Box>
        </Box>
        <HStack spacing={10} bg={"#fdf1f1"} p={{ base: 4, md: 15, lg: 30 }}>
          <Button style={{ background: "#F79D5C", color: "white" }}>
            become a member
          </Button>
          <Button style={{ color: "#F79D5C" }} variant={"outline"}>
            exprole classes
          </Button>
        </HStack>
        <Box>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            className="waves"
            preserveAspectRatio="none"
            viewBox="0 24 150 24"
            // {...props}
          >
            <defs>
              <path
                id="a"
                d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18v44h-352z"
              />
            </defs>
            <g className="parallax">
              <use xlinkHref="#a" x={48} fill="#F79D5C" />
              <use xlinkHref="#a" x={48} fill="#efded7" />
            </g>
          </svg>
        </Box>
      </Box>
    </UiContainer>
  );
}
