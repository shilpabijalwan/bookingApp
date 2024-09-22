"use client"; // Mark as a client component

import { fetchUserData, UserSignUp } from "@/services/authService";
import { BeatLoader } from "react-spinners";
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
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import LoginModal from "@/modals/LoginModal";

import UserLayout from "@/layout/UserLayout";

function SignUp() {
  const initialRef = useRef();
  const toast = useToast();
  const {
    isOpen: isOpenLogin,
    onOpen: onOpenLogin,
    onClose: onCloseLogin,
  } = useDisclosure();

  const isLoading = useSelector((data) => {
    return data.auth.isLoading;
  });

  const [show, setShow] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleSignUp = async (data) => {
    try {
      await UserSignUp(data)
        .then((res) => {
          reset();
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

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <UserLayout>
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
              <FormLabel htmlFor="name">User Name:</FormLabel>
              <Input
                ref={initialRef}
                focusBorderColor="gray.100"
                id="username"
                type="text"
                {...register("userName", { required: "user name is required" })}
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
                {...register("email", { required: "email is required" })}
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
                type={show ? "text" : "password"}
                {...register("password", { required: "password is required" })}
              />
              <p onClick={() => setShow((pre) => !pre)}>
                {show ? "hide" : "show"}
              </p>

              <FormErrorMessage color={"red"}>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>

            {!isLoading ? (
              <Button
                type="submit"
                width="full"
                style={{ backgroundColor: "#F79D5C" }}
                color={"white"}
              >
                Sign up
              </Button>
            ) : (
              <Button
                isLoading
                width="full"
                color={"white"}
                colorScheme="orange"
                spinner={<BeatLoader size={8} color="white" />}
              >
                Click me
              </Button>
            )}
          </form>
          <Text mt={4}>
            Already have an account ?{" "}
            <span
              onClick={onOpenLogin}
              style={{ marginLeft: "6px", color: "blue", cursor: "pointer" }}
            >
              Login
            </span>
          </Text>
          <LoginModal isOpen={isOpenLogin} onClose={onCloseLogin} />
        </Box>
      </Box>
    </UserLayout>
  );
}

export default SignUp;
