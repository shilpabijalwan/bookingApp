import { Box } from "@chakra-ui/react";
import React from "react";

function UiContainer({ children }) {
  return (
    <Box fontSize={{ base: 14, sm: 16, md: 16, "2xl": 20 }} m={0}>
      {children}
    </Box>
  );
}

export default UiContainer;
