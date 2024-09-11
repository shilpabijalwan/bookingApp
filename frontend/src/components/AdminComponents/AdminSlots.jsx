import { Box, Button, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

function AdminSlots({ data, onSelectSlot, selectedSlots }) {
  // This will log when selectSlot changes
  const isSelected = selectedSlots.includes(data);
  return (
    <>
      <Button
        m={5}
        size="md"
        height="48px"
        width={["300px", "200px"]} // Responsive width: full on small screens, fixed on larger screens
        border="1px" // Thicker border for a more noticeable look
        borderColor="#727D97"
        backgroundColor={isSelected ? "#011936" : "gray.50"}
        textColor={isSelected ? "white" : "black"}
        borderRadius="3xl" // Rounded corners
        _hover={{
          // Light green background on hover
          borderColor: "green.600", // Darker green border on hover
          transform: "scale(1.05)",
          // Slightly enlarge button on hover
        }}
        onClick={() => onSelectSlot(data)}
        ml={4}
        mb={4} // Space at the bottom and left
      >
        {data}
      </Button>
    </>
  );
}

export default AdminSlots;
