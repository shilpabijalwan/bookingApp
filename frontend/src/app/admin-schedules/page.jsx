"use client";

import AdminCalander from "@/components/AdminComponents/AdminCalander";
import AdminLayout from "@/layout/AdminLayout";
import { Box, Text } from "@chakra-ui/react";
import React from "react";

function AdminSchedule() {
  const startTime = new Date();
  return (
    <AdminLayout>
      <Box border={"1px solid blue"}>
        <Text fontSize={30} fontWeight={"bold"} textAlign={"center"}>
          Pick your slots
        </Text>
      </Box>

      {/* <AdminCalander /> */}
    </AdminLayout>
  );
}

export default AdminSchedule;
