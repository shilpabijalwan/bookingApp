import AdminLayout from "@/layout/AdminLayout";
import { Box, Text } from "@chakra-ui/react";
import React from "react";

function AdminDashboard() {
  return (
    <>
      <AdminLayout>
        <Box margin={"auto"} border={"1px sold green"}>
          <Text border={"1px solid blue"}>admin dashboard</Text>
        </Box>
      </AdminLayout>
    </>
  );
}

export default AdminDashboard;
