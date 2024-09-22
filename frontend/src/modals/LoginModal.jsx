import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { BeatLoader } from "react-spinners";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { fetchUserData, userLogin } from "@/services/authService";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { userInfo } from "@/redux/authSlice";

function LoginModal({ isOpen, onClose }) {
  const [show, setShow] = useState(false);
  const toast = useToast();

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const isLoading = useSelector((data) => {
    return data.auth.isLoading;
  });
  const handleModal = () => {
    onClose();
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const isEmail = (input) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);

  const handleSLogin = async (data) => {
    let payloadData = "";

    const inputValue = data.userName;
    if (isEmail(inputValue)) {
      payloadData = { email: inputValue, password: data.password };
    } else {
      payloadData = { userName: inputValue, password: data.password };
    }

    try {
      await userLogin(payloadData).then((res) => {
        console.log(res);
        reset();
        toast({
          title: res?.data?.message,
          status: "success",
          isClosable: true,
          duration: 1000,
        });
        onClose();
        fetchUserData();
      });
    } catch (error) {
      toast({
        title: error.response?.data?.message,
        status: "error",
        isClosable: true,
        duration: 1000,
      });
    }
  };
  // useEffect(() => {

  // }, []);

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent mt={32} pb={10}>
        <ModalHeader color={"#f79d5c"}>Sign in to YogaLife</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(handleSLogin)}>
          <ModalBody pb={6}>
            <FormControl isInvalid={errors.userName}>
              <FormLabel>Username or email address</FormLabel>
              <Input
                type="text"
                ref={initialRef}
                placeholder="email or user name"
                focusBorderColor="gray.100"
                {...register("userName", {
                  required: "user name or email is required",
                })}
              />
              <FormErrorMessage color={"red"}>
                {errors.userName && errors.userName.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl mt={4} isInvalid={errors.password}>
              <FormLabel>Password</FormLabel>
              <Input
                type={show ? "text" : "password"}
                placeholder="Enter your password"
                focusBorderColor="gray.100"
                {...register("password", { required: "password is required" })}
              />
              <p onClick={() => setShow((pre) => !pre)}>
                {show ? "hide" : "show"}
              </p>
              <FormErrorMessage color={"red"}>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            {!isLoading ? (
              <Button
                type="submit"
                m={"auto"}
                px={"48"}
                bg={"#f79d5c"}
                textColor={"white"}
                _hover={{ bg: "#fbcfa4" }}
              >
                Login
              </Button>
            ) : (
              <Button
                isLoading
                width="full"
                color={"white"}
                colorScheme="orange"
                spinner={<BeatLoader size={8} color="white" />}
              >
                click
              </Button>
            )}
          </ModalFooter>
        </form>
        <Box m={"auto"} mt={4} w={"100%"} textAlign={"center"}>
          Don't have an account ?
          <Link
            onClick={handleModal}
            href={"/signup"}
            style={{ marginLeft: "2px", color: "blue" }}
          >
            Sign up
          </Link>
        </Box>
      </ModalContent>
    </Modal>
  );
}

export default LoginModal;
