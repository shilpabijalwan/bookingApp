"use client";
import { Box } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

function Classes() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/blog")
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <Box mt={"30"} p={42}>
      No classes available
    </Box>
  );
}

export default Classes;
