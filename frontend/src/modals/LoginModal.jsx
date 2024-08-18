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
} from "@chakra-ui/react";
import Link from "next/link";
import React, { useRef } from "react";

function LoginModal({ isOpen, onClose }) {
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  return (
    <Modal
      closeOnOverlayClick={false}
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
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Username or email address</FormLabel>
            <Input ref={initialRef} placeholder="email or user name" />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Password</FormLabel>
            <Input placeholder="Enter your password" focusBorderColor="none" />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            m={"auto"}
            px={"48"}
            bg={"#f79d5c"}
            textColor={"white"}
            _hover={{ bg: "#fbcfa4" }}
          >
            Login
          </Button>
        </ModalFooter>
        <Box href={"/signup"} m={"auto"} mt={4} w={"100%"} textAlign={"center"}>
          Don't have an account ?
          <Link href={"/signup"} style={{ marginLeft: "2px", color: "blue" }}>
            Sign up
          </Link>
        </Box>
      </ModalContent>
    </Modal>
  );
}

export default LoginModal;
