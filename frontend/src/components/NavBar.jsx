"use client";

import {
  Box,
  Flex,
  Avatar,
  HStack,
  Text,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Image,
  VStack,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, AddIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
// import { Link } from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import LoginModal from "@/modals/LoginModal";
import { useSelector } from "react-redux";
import { fetchUserData } from "@/services/authService";

const Links = [
  { link: "/", name: "Home" },
  { link: "/classes", name: "Classes" },
  { link: "/blog", name: "Blog" },
  { link: "/schedules", name: "Schedules" },
  { link: "/about", name: "About us" },
];

const NavLink = (props) => {
  const { children } = props;

  return (
    <HStack
      spacing={12}
      display={{ base: "none", md: "flex" }}
      as="nav"
      href={"#"}
    >
      {children}
    </HStack>
  );
};

export default function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenLogin,
    onOpen: onOpenLogin,
    onClose: onCloseLogin,
  } = useDisclosure();
  const [flag, setFlag] = useState(false);
  const pathname = usePathname();
  const btnRef = useRef();
  const router = useRouter();

  const isAdmin = useSelector((data) => {
    return data.auth.userDetails;
  });

  const handleAdminDashboard = () => {
    router.push("/admin-dashboard");
  };
  useEffect(() => {
    if (!isAdmin?.id) {
      fetchUserData();
    }
  }, []);
  return (
    <Box bg={"#fdf1f1"} px={4} h={20}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <IconButton
          size={"md"}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
          ref={btnRef}
        />
        <HStack>
          <Box w={120} h={50}>
            <Image src="yogaa.png" alt="logo" />
          </Box>
        </HStack>

        <NavLink as={"nav"}>
          {Links.map((link, index) => (
            <Link
              href={link.link}
              key={index}
              className={pathname == link.link ? "active" : ""}
              rounded={"md"}
            >
              {link.name}
            </Link>
          ))}
        </NavLink>

        <Flex alignItems={"center"}>
          {isAdmin?.role == "admin" && (
            <Button
              bg={"#011936"}
              textColor={"white"}
              onClick={handleAdminDashboard}
            >
              Admin Dashboard
            </Button>
          )}
          {!isAdmin?.id &&
          isAdmin?.role !== "admin" &&
          isAdmin?.role !== "user" ? (
            <Button
              onClick={onOpenLogin}
              // as={NextLink}
              // href="/login"
              // variant={"solid"}
              bg={"#F79D5C"}
              size={"sm"}
              mr={4}
              color={"white"}
              _hover={{ color: "none" }}
            >
              Login
            </Button>
          ) : (
            <Button
              display={isAdmin?.role == "admin" ? "none" : ""}
              bg={"#F79D5C"}
              size={"sm"}
              mr={4}
              px={8}
              color={"white"}
              _hover={{ color: "none" }}
            >
              {isAdmin?.userName}
            </Button>
          )}

          <LoginModal isOpen={isOpenLogin} onClose={onCloseLogin} />

          {/* <Menu> */}
          {/* <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
              </MenuButton> */}
          {/* <MenuList>
                <MenuItem>Link 1</MenuItem>
                <MenuItem>Link 2</MenuItem>
                <MenuDivider />
                <MenuItem>Link 3</MenuItem>
              </MenuList> */}
          {/* </Menu> */}
        </Flex>
      </Flex>
      {isOpen && (
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader>
              <Image src="yogaa.png" alt="logo" w={120} />
              <DrawerCloseButton size={"lg"} mt={6} pr={4} />
            </DrawerHeader>

            <DrawerBody>
              <VStack as={"nav"} spacing={4}>
                {Links.map((link, index) => (
                  <Link
                    href={link.link}
                    key={index}
                    className={pathname == link.link ? "active" : ""}
                    rounded={"md"}
                  >
                    {link.name}
                  </Link>
                ))}
              </VStack>
            </DrawerBody>

            <DrawerFooter>
              {/* <Button
                // as={NextLink}
                // href="/login"
                bg={"#F79D5C"}
                size={"sm"}
                mr={4}
                color={"white"}
                _hover={{ color: "none" }}
              >
                Login
              </Button> */}
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </Box>
  );
}
