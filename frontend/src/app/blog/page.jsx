"use client";
import React from "react";
import UiContainer, { BlogContainer } from "@/components/UiContainer";
import { Box } from "@chakra-ui/react";
import { blogs } from "@/constants/blogdata";
import Link from "next/link";

function Blog() {
  const handleOpenBlog = (blogId) => {
    console.log(blogId);
  };
  return (
    <UiContainer>
      {blogs.map((ele) => (
        <Box
          key={ele.id}
          mt={42}
          border={"1px solid gray"}
          w={"50%"}
          m={"auto"}
          mb={10}
          onClick={() => handleOpenBlog(ele.id)}
        >
          <Link href={`/blog/${ele.id}`}>
            <p>{ele.author}</p>
            <p>{ele.publishedDate}</p>
            <p>{ele.title}</p>
            <p>{ele.title}</p>
          </Link>
        </Box>
      ))}
    </UiContainer>
  );
}

export default Blog;
