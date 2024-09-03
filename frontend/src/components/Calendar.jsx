import { AddIcon, ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  grid,
  SimpleGrid,
  Text,
  textDecoration,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

function Calendar() {
  const [days, setDays] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [formattedDate, setFormattedDate] = useState("");

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

  console.log(
    "firstday",
    firstDayCurrentMonth,
    "last day",
    lastDayCurrentMonth,
    "firstDayIndex",
    firstDayIndex
  );

  const handleSelectedDate = (date) => {
    console.log("selected date", date);
    setSelectedDate(date);
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
      tempData.push(<Text key={`empty-${i}`}>{i}</Text>);
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
  }, [numberOfDays, selectedDate, month, year]);

  return (
    <Box w={"100%"}>
      <Box
        display={"flex"}
        border={"1px solid gray"}
        w={{ base: "80%", sm: "70%", lg: "50%" }}
        mt={10}
        m={"auto"}
        justifyContent={"space-evenly"}
      >
        <Button
          height={10}
          w={10}
          borderRadius={"50%"}
          bg={"#f79d5c"}
          color={"white"}
          onClick={handlePreviousMonth}
        >
          <ArrowLeftIcon boxSize={3} />
        </Button>
        <Text mt={2} fontSize={18} color={"#f79d5c"} fontWeight={"bold"}>
          {formattedDate}
        </Text>
        <Button
          height={10}
          w={10}
          borderRadius={"50%"}
          bg={"#f79d5c"}
          color={"white"}
          onClick={handleNextMonth}
        >
          <ArrowRightIcon boxSize={3} />
        </Button>
      </Box>
      <SimpleGrid
        style={{
          boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
        }}
        columns={7}
        spacing={4}
        mb={4}
        w={{ base: "80%", md: "60%", xl: "50%" }}
        m={"auto"}
        mt={10}
        p={8}
      >
        {dayNames.map((day, index) => (
          <Box key={index} fontWeight="bold">
            {day}
          </Box>
        ))}
      </SimpleGrid>
      <SimpleGrid
        style={{
          boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
        }}
        // border={{
        //   base: "1px solid blue",
        //   sm: "1px solid red",
        //   xl: "1px solid black",
        // }}
        columns={7}
        spacing={4}
        w={{ base: "80%", md: "60%", xl: "50%" }}
        m={"auto"}
        p={8}
        textAlign={"center"}
      >
        {days}
      </SimpleGrid>
    </Box>
  );
}

export default Calendar;
