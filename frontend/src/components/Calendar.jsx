import { AddIcon, ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Slots from "./Slots";

function Calendar() {
  const [days, setDays] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [formattedDate, setFormattedDate] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);

  const today = new Date();

  let [month, setMonth] = useState(today.getMonth());
  let [year, setYear] = useState(today.getFullYear());

  const getHours = today.getHours();
  const getMinutes = today.getMinutes();
  const getSeconds = today.getSeconds();

  let firstDayCurrentMonth = new Date(year, month, 1); //representing the first day of the current month.
  let lastDayCurrentMonth = new Date(year, month + 1, 0); //representing the last day of the current month.

  let firstDayIndex = firstDayCurrentMonth.getDay(); //firstDay to get the index of the first day of the week.eg, 0 represents Sunday, 1 represents Monday,
  let numberOfDays = lastDayCurrentMonth.getDate();

  let dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const slotsData = {
    "Sat Nov 09 2024": ["10:00 AM - 10:45 AM", "11:00 AM", "2:00 PM"],
    "Sun Nov 10 2024": ["9:00 AM", "1:00 PM", "3:00 PM"],
    "Thu Sep 05 2024": ["10:00 AM - 10:45 AM", "10:00 PM", "3:00 PM"],
    // Add more dates and slots as needed
  };

  const handleSelectedDate = (date) => {
    console.log("selected date", date);
    setSelectedDate(date);

    if (date) {
      setAvailableSlots(slotsData[date] || []);
    }
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
        setAvailableSlots(slotsData[formattedDate] || []);
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
              ? "#f79d5c"
              : isCurrentDate && selectedDate
              ? "#fbcfa4" // Selected date
              : isCurrentDate && !selectedDate
              ? "#f79d5c" // Today's date when no date is selected
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
    <Box
      w={"95%"}
      m="auto"
      display="flex"
      flexDirection={["column", "column", "row"]}
    >
      <Stack
        w={["100%", "100%", "50%"]}
        m="auto"
        mt={10}
        p={6}
        boxShadow="md"
        borderRadius="md"
      >
        <HStack justifyContent="space-between">
          <Button
            onClick={handlePreviousMonth}
            height={10}
            w={10}
            borderRadius={"50%"}
            bg={"#f79d5c"}
            color={"white"}
          >
            <ArrowLeftIcon boxSize={3} />
          </Button>
          <Text fontSize="lg" fontWeight="bold" color="#f79d5c">
            {formattedDate}
          </Text>
          <Button
            onClick={handleNextMonth}
            height={10}
            w={10}
            borderRadius={"50%"}
            bg={"#f79d5c"}
            color={"white"}
          >
            <ArrowRightIcon />
          </Button>
        </HStack>

        <SimpleGrid columns={7} spacing={4} mt={6}>
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
            (day, index) => (
              <Text key={index} fontWeight="bold" textAlign="center">
                {day}
              </Text>
            )
          )}
        </SimpleGrid>

        <SimpleGrid columns={7} spacing={4} mt={4}>
          {days}
        </SimpleGrid>
      </Stack>
      {/* <Box
        alignItems={"center"}
        w={["100%", "100%", "50%"]}
        p={4}
        boxShadow="md"
        borderRadius="md"
        // border="1px solid black"
        mt={[6, 0]}
        gap={4}
      > */}
      {availableSlots.length ? (
        availableSlots.map((slot, i) => <Slots key={i} data={slot} />)
      ) : (
        <Text>No slots available</Text>
      )}
      {/* </Box> */}
    </Box>
  );
}

export default Calendar;
