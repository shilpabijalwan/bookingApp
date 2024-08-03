import NavBar from "@/components/NavBar";
import React from "react";

function UserLayout({ children }) {
  return (
    <>
      <NavBar />
      <main>{children}</main>
    </>
  );
}

export default UserLayout;
