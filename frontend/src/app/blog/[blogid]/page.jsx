"use client";

import { useParams } from "next/navigation";
import React from "react";

function page() {
  console.log(useParams());
  const params = useParams();
  console.log(params);
  return (
    <div>
      <div>My Post: {params.blogid}</div>
    </div>
  );
}

export default page;
