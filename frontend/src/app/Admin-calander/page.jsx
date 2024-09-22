"use client";

import AdminCalander from "@/components/AdminComponents/AdminCalander";
import AdminLayout from "@/layout/AdminLayout";
import { Stack } from "@chakra-ui/react";

function AdminCalanderPage() {
  return (
    <AdminLayout>
      <Stack mb={20} w={["95%"]} margin={"auto"} p={6}>
        <AdminCalander />
      </Stack>
    </AdminLayout>
  );
}

export default AdminCalanderPage;
