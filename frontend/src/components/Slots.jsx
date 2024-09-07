import { Button, Text } from "@chakra-ui/react";

function Slots({ data }) {
  // Log the data for debugging

  return (
    <>
      <Button
        size="md"
        height="48px"
        width={["100%", "200px"]} // Responsive width: full on small screens, fixed on larger screens
        border="2px" // Thicker border for a more noticeable look
        borderColor="green.500"
        borderRadius="md" // Rounded corners
        backgroundColor="gray.50" // Light background color
        _hover={{
          bg: "green.50", // Light green background on hover
          borderColor: "green.600", // Darker green border on hover
          transform: "scale(1.05)", // Slightly enlarge button on hover
        }}
        color="black"
        onClick={() => console.log(`Slot selected: ${data}`)}
        ml={4}
        mb={4} // Space at the bottom and left
      >
        {data}
      </Button>
    </>
  );
}

export default Slots;
