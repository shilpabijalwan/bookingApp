"use client";
import { Box } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

function Classes() {
  const [data, setData] = useState([]);
  console.log(data);

  return (
    <Box mt={"30"} p={42}>
      No classes available
    </Box>
  );
}

export default Classes;
