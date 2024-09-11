import { Box, Flex } from "@chakra-ui/react";
import AdminTopbar from "./AdminTopbar";
import AdminNavbar from "@/components/AdminComponents/AdminNavbar";

function AdminLayout({ children }) {
  return (
    <Flex height="100vh">
      {/* Sidebar */}
      <Box
        as="aside"
        width={{ base: "0px", md: "15%" }} // Responsive sidebar width
        bg="white"
        zIndex={6}
        display={{ base: "block", md: "block" }} // Hide sidebar on mobile
      >
        <AdminNavbar />
      </Box>

      {/* Main Content */}
      <Box as="main" flex={1} flexDirection="column">
        {/* Topbar */}
        <Box as="header" bg="gray.50" boxShadow="sm" zIndex={5}>
          <AdminTopbar />
        </Box>

        {/* Main content area */}
        <Box flex={1} p={{ base: 4, md: 8 }} overflowY="auto">
          {children}
        </Box>
      </Box>
    </Flex>
  );
}

export default AdminLayout;
