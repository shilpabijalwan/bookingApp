"use client"; // Mark as a client component

import { ToastStatus } from "@/customErrors/UpdatingToast";
import { UserSignUp } from "@/services/authService";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Text,
  useToast,
  Toast,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

function SignUp() {
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSignUp = async (data) => {
    try {
      await UserSignUp(data)
        .then((res) => {
          console.log(res, "response:----------------->");
          toast({
            title: res?.data?.message,
            status: "success",
            isClosable: true,
            duration: 1000,
          });
        })
        .catch((err) => {
          console.log(err.response?.data?.message);
          toast({
            title: err.response?.data?.message,
            status: "error",
            isClosable: true,
            duration: 1000,
          });
        });
    } catch (error) {}
  };

  return (
    <Box width={{ base: "100%", md: "50%", lg: "45%" }} mx="auto">
      <Box
        m={"auto"}
        mt={18}
        className="SignUpBox"
        p={10}
        width={{ base: "70%", md: "100%", lg: "100%" }}
      >
        <Text
          fontSize={"26px"}
          textAlign={"center"}
          mb={6}
          color={"#F79D5C"}
          fontWeight={"bold"}
        >
          Sign up to Yoga Life
        </Text>
        <form onSubmit={handleSubmit(handleSignUp)}>
          <FormControl isInvalid={errors.userName}>
            <FormLabel htmlFor="email">User Name:</FormLabel>
            <Input
              focusBorderColor="gray.100"
              id="username"
              type="text"
              {...register("userName", { required: "User Name is required" })}
            />
            <FormErrorMessage color={"red"}>
              {errors.userName && errors.userName.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.email} mb={4}>
            <FormLabel htmlFor="email">Email:</FormLabel>
            <Input
              focusBorderColor="gray.100"
              id="email"
              type="email"
              {...register("email", { required: "Email is required" })}
            />
            <FormErrorMessage color={"red"}>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.password} mb={4}>
            <FormLabel htmlFor="password">Password:</FormLabel>
            <Input
              focusBorderColor="gray.100"
              id="password"
              type="password"
              {...register("password", { required: "Password is required" })}
            />

            <FormErrorMessage color={"red"}>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>

          <Button
            type="submit"
            width="full"
            style={{ backgroundColor: "#F79D5C" }}
            color={"white"}
          >
            Sign up
          </Button>
        </form>
      </Box>
    </Box>
  );
}

export default SignUp;
