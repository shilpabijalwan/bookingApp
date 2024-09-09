"use client";

import AdminCalander from "@/components/AdminComponents/AdminCalander";
import AdminLayout from "@/layout/AdminLayout";
import React from "react";

function AdminSchedule() {
  return (
    <AdminLayout>
      SlotBooking
      <AdminCalander />
    </AdminLayout>
  );
}

export default AdminSchedule;
