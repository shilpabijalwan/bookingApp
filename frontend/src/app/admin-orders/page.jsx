import AdminLayout from "@/layout/AdminLayout";
import { Box, Text } from "@chakra-ui/react";

function AdminOrders() {
  return (
    // <Box display={"flex"}>

    <AdminLayout>
      <Text border={"1px solid blue"} ml={16} justifyItems={"top"}>
        Orders
      </Text>
    </AdminLayout>
  );
}

export default AdminOrders;
