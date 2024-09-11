import {
  Box,
  Button,
  Grid,
  grid,
  HStack,
  SimpleGrid,
  Stack,
  Text,
  textDecoration,
  useDisclosure,
} from "@chakra-ui/react";
import { AddIcon, ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import { OpenSlotModal } from "@/modals/SlotBookingModal";

function AdminCalander() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const today = new Date();

  const [year, setYear] = useState(today.getFullYear());
  let [month, setMonth] = useState(today.getMonth());
  const [days, setDays] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [formattedDate, setFormattedDate] = useState("");

  const getHours = today.getHours();
  const getMinutes = today.getMinutes();
  const getSeconds = today.getSeconds();

  let firstDayCurrentMonth = new Date(year, month, 1);
  let lastDayCurrentMonth = new Date(year, month + 1, 0);

  let firstDayIndex = firstDayCurrentMonth.getDate();
  let numberOfDays = lastDayCurrentMonth.getDate();
  let dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handleSelectedDate = (date) => {
    console.log("selected date", date);
    setSelectedDate(date);
    // onOpen();
  };

  const handlePreviousMonth = () => {
    let newMonth = month - 1;
    let newYear = year;

    if (newMonth < 0) {
      newMonth = 11;
      newYear = newYear - 1;
    }
    setMonth(newMonth);
    setYear(newYear);
    setSelectedDate("");
  };

  const handleNextMonth = () => {
    let newMonth = month + 1;
    let newYear = year;
    if (newMonth > 11) {
      newMonth = 0; // Reset to January
      newYear += 1; // Increment the year
    }
    setMonth(newMonth);
    setYear(newYear);
    setSelectedDate("");
  };

  useEffect(() => {
    const tempData = [];
    for (let i = 1; i <= firstDayIndex; i++) {
      tempData.push(<Text key={`empty-${i}`}></Text>);
    }
    setDays(tempData);
  }, [firstDayIndex]);

  useEffect(() => {
    const newDate = new Date(year, month);
    const formatted = newDate.toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    });
    setFormattedDate(formatted);

    const tempDays = [];
    for (let i = 1; i <= numberOfDays; i++) {
      let currentDate = new Date(year, month, i);

      let isCurrentDate =
        currentDate.getFullYear() == new Date().getFullYear() &&
        currentDate.getMonth() == new Date().getMonth() &&
        currentDate.getDate() == new Date().getDate();

      let isSelectedDate =
        selectedDate && selectedDate === currentDate.toDateString();
      if (isCurrentDate && !selectedDate) {
        const formattedDate = currentDate.toDateString();
        // setAvailableSlots(slotsData[formattedDate] || []);
      }
      tempDays.push(
        <Box
          style={{
            boxShadow:
              "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
          }}
          key={i}
          data-date={currentDate.toDateString()}
          bg={
            isSelectedDate
              ? "#011936"
              : isCurrentDate && selectedDate
              ? "#8AA5BC" // Selected date
              : isCurrentDate && !selectedDate
              ? "#011936" // Today's date when no date is selected
              : "gray.100" // Default background for other dates
          }
          color={
            isSelectedDate || (isCurrentDate && !selectedDate)
              ? "white"
              : "black"
          }
          borderRadius={"50%"}
          textAlign="center"
          border="1px solid"
          borderColor="gray.200"
          height={12}
          w={12}
          fontFamily={"sm"}
          cursor={"pointer"}
          onClick={() => handleSelectedDate(currentDate.toDateString())}
        >
          <Text w={"100%"} mt={3} cursor={"pointer"}>
            {i}
          </Text>
        </Box>
      );
    }

    setDays((prevDays) => [...prevDays.slice(0, firstDayIndex), ...tempDays]); // Combine empty days and actual days
  }, [numberOfDays, selectedDate, month, year, selectedDate]);

  return (
    <>
      <Box
        //   border={"3px solid green"}
        w={["95%", "95%", "100%"]}
        m={"auto"}
        justifyContent={"center"}
        //   ml={[2, 4, 36, , 36, 64]}
      >
        {/* <Box
        w={"95%"}
        m="auto"
        display="flex"
        flexDirection={["column", "column", "row"]}
      > */}
        <Stack
          w={["100%", "100%", "80%", "70%", "50%"]}
          m="auto"
          mt={10}
          p={6}
          boxShadow="md"
          borderRadius="md"
          alignSelf={"center"}
          // border={"1px solid blue"}
          ml={[32, 32, 32, "auto"]}
        >
          <HStack justifyContent="space-between">
            <Button
              onClick={handlePreviousMonth}
              height={10}
              w={10}
              borderRadius={"50%"}
              bg={"#011936"}
              color={"white"}
            >
              <ArrowLeftIcon boxSize={3} />
            </Button>
            <Text fontSize="lg" fontWeight="bold" color="#011936">
              {formattedDate}
            </Text>
            <Button
              onClick={handleNextMonth}
              height={10}
              w={10}
              borderRadius={"50%"}
              bg={"#011936"}
              color={"white"}
            >
              <ArrowRightIcon />
            </Button>
          </HStack>

          <SimpleGrid columns={7} spacing={4} mt={6}>
            {dayNames?.map((ele, index) => (
              <Text key={index} fontWeight="bold" textAlign="center">
                {ele}
              </Text>
            ))}
          </SimpleGrid>
          <OpenSlotModal isOpen={isOpen} onClose={onClose} />

          <SimpleGrid columns={7} spacing={4} mt={4}>
            {days}
          </SimpleGrid>
        </Stack>
      </Box>
    </>
  );
}

export default AdminCalander;
