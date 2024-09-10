import { Box, Flex } from "@chakra-ui/react";
import AdminTopbar from "./AdminTopbar";
import AdminNavbar from "@/components/AdminComponents/AdminNavbar";

function AdminLayout({ children }) {
  return (
    <Flex height="100vh">
      {/* Sidebar */}
      <Box
        as="aside"
        width="15%" // Adjust the sidebar width as needed
        bg="white"
        // padding={4}

        zIndex={6}
      >
        <AdminNavbar />
      </Box>

      {/* Main Content */}
      <Box as="main" flex={1} flexDirection="column">
        {/* Topbar */}
        <Box as="header" bg="gray.50">
          <AdminTopbar />
        </Box>

        {/* Main content area */}
        <Box flex={1} padding={8}>
          {children}
        </Box>
      </Box>
    </Flex>
  );
}

export default AdminLayout;
