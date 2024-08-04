import { Box } from "@chakra-ui/react";
import React from "react";

function UiContainer({ children }) {
  return (
    <Box
      border={"1px solid blue"}
      mt={10}
      m={{ base: 4, md: 15, lg: 30 }}
      fontSize={{ base: 14, sm: 16, md: 18, "2xl": 20 }}
    >
      {children}
    </Box>
  );
}

export default UiContainer;
