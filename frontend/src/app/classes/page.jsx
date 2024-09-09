"use client";
import UserLayout from "@/layout/UserLayout";
import { Box } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

function Classes() {
  const [data, setData] = useState([]);
  console.log(data);

  return (
    <UserLayout>
      <Box mt={"30"} p={42}>
        No classes available
      </Box>
    </UserLayout>
  );
}

export default Classes;
