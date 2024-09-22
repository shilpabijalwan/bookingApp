"use client";
import { fetchUserData } from "@/services/authService";
import { Box, Button, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

function AdminTopbar() {
  const admindata = useSelector((data) => {
    return data?.auth;
  });
  useEffect(() => {
    fetchUserData();
  }, []);
  return (
    <Box textAlign={"end"} w={"100%"} p={2}>
      <Button bg={"#011936"} textColor={"white"}>
        {admindata?.userDetails.userName}
      </Button>
    </Box>
  );
}

export default AdminTopbar;
