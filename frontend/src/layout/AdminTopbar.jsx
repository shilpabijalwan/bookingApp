import { Box, Text } from "@chakra-ui/react";
import React from "react";

function AdminTopbar() {
  return (
    <Box border={"1px solid blue"} textAlign={"end"} w={"100%"} p={4}>
      <Text>name :-- Admin Name</Text>
    </Box>
  );
}

export default AdminTopbar;
