import { Box } from "@chakra-ui/react";
import React from "react";

function UiContainer({ children }) {
  return (
    <Box fontSize={{ base: 14, sm: 16, md: 18, "2xl": 22 }} m={0}>
      {children}
    </Box>
  );
}

export function BlogContainer({ children }) {
  <Box fontSize={{ base: 14, sm: 16, md: 18, "2xl": 22 }} m={0}>
    {children}
  </Box>;
}

export default UiContainer;
