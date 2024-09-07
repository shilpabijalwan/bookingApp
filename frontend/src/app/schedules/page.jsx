"use client";

import React, { Suspense, useEffect } from "react";

import { Box, Text } from "@chakra-ui/react";
import Calendar from "@/components/Calendar";

function Schedules() {
  return (
    <Box>
      {/* <Suspense fallback={<Text>Loading Calendar...</Text>}> */}
      <Calendar />
      {/* </Suspense> */}
    </Box>
  );
}

export default Schedules;
