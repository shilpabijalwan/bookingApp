"use client";

import AdminCalander from "@/components/AdminComponents/AdminCalander";
import AdminSlots from "@/components/AdminComponents/AdminSlots";
import AdminLayout from "@/layout/AdminLayout";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  SimpleGrid,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Stack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import BeatLoader from "react-spinners/BeatLoader";

function AdminSchedule() {
  const [timeSlots, setTimeSlots] = useState([]);
  const [formattedTimes, setFormattedTimes] = useState({
    amStartTime: "04:00",
    amEndTime: "12:00",
    pmStartTime: "16:00",
    pmEndTime: "20:00",
    slotDuration: 45,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [selectSlots, setSelecteSlots] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const generateTimeSlots = (amStart, amEnd, pmStart, pmEnd, slotDuration) => {
    console.log(amStart, amEnd, pmStart, pmEnd, slotDuration);
    const allSlots = [];

    // Generate AM slots
    const amSlots = generateTimeRange(amStart, amEnd, slotDuration);
    allSlots.push(...amSlots);

    // Generate PM slots
    const pmSlots = generateTimeRange(pmStart, pmEnd, slotDuration);
    allSlots.push(...pmSlots);

    return allSlots;
  };

  const generateTimeRange = (startTime, endTime, slotDuration) => {
    const slots = [];
    let currentTime = new Date(`1970-01-01T${startTime}`);

    const endTimeDate = new Date(`1970-01-01T${endTime}`);

    while (currentTime < endTimeDate) {
      const startSlot = new Date(currentTime);
      currentTime.setMinutes(currentTime.getMinutes() + slotDuration);
      const endSlot = new Date(currentTime);

      const slotString = `${formatTime(startSlot)} - ${formatTime(endSlot)}`;
      slots.push(slotString);
    }

    return slots;
  };

  const formatTime = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12; // 12-hour format, 0 should be 12
    minutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${minutes} ${ampm}`;
  };

  const handleInputValue = (e) => {
    let slotDuration = e ? parseInt(e) : 45;
    setFormattedTimes((prevTimes) => ({
      ...prevTimes,
      slotDuration: slotDuration, // Update the slotDuration value
    }));
    reset();
    setSelecteSlots([]);
  };
  useEffect(() => {
    setIsLoading(true);

    const generatedSlots = generateTimeSlots(
      formattedTimes.amStartTime,
      formattedTimes.amEndTime,
      formattedTimes.pmStartTime,
      formattedTimes.pmEndTime,
      formattedTimes.slotDuration
    );
    setTimeSlots(generatedSlots);
    setIsLoading(false);

    console.log(generatedSlots);
  }, [formattedTimes]);
  // Re-run this effect when formattedTimes changes
  const handleSelecetAllSlot = (slots) => {
    console.log("select all", slots);
    if (selectSlots?.length == slots.length) {
      setSelecteSlots([]);
    } else {
      setSelecteSlots(slots);
    }
  };

  const handleSelectedSlot = (slot) => {
    setSelecteSlots((prev) => {
      if (prev.includes(slot)) {
        return prev.filter((s) => s !== slot); // Append the new slot to the array
      }
      return [...prev, slot]; // Prevent duplicates
    });
    console.log(selectSlots);
  };
  return (
    <AdminLayout>
      <Stack mb={20} w={["95%"]} margin={"auto"} p={6}>
        <FormLabel>Duration Time</FormLabel>
        <Slider
          aria-label="slider-ex-3"
          defaultValue={45}
          min={15}
          max={120}
          step={1}
          onChange={(e) => handleInputValue(e)}
        >
          <SliderTrack bg="blue.100">
            <SliderFilledTrack bg="#011936" />
          </SliderTrack>
          <SliderThumb boxSize={6} border={"blue"} />
        </Slider>
        <Text>slot duration time: {formattedTimes.slotDuration} mins</Text>
      </Stack>

      <Box
        w={"95%"}
        m={"auto"}
        mt={8}
        style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
        p={4}
      >
        <Flex justifyContent={"space-evenly"}>
          <Text fontSize={30} fontWeight={"bold"} textAlign={"center"}>
            Pick Your Slots
          </Text>
          <Text
            fontWeight={"bold"}
            textAlign={"center"}
            display={"flex"}
            gap={2}
            mt={3}
            onClick={() => handleSelecetAllSlot(timeSlots)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="22"
              fill={
                selectSlots?.length === timeSlots.length ? "#1a314c" : "none"
              }
              stroke="#1a314c"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="3" y="3" width="6" height="6" rx="2" />
              <rect x="15" y="3" width="6" height="6" rx="2" />
              <rect x="3" y="15" width="6" height="6" rx="2" />
              <rect x="15" y="15" width="6" height="6" rx="2" />
              <rect x="15" y="15" width="6" height="6" rx="2" />
            </svg>{" "}
            select All
          </Text>
        </Flex>

        <SimpleGrid
          columns={[1, 2, 2, 3, 4]}
          border={"1px solid red"}
          spacing={1}
        >
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            timeSlots.map((slot, index) => (
              <AdminSlots
                data={slot}
                key={index}
                onSelectSlot={handleSelectedSlot}
                selectedSlots={selectSlots}
              />
            ))
          )}
        </SimpleGrid>
        <Box
          mt={10}
          position={"fixed"}
          bottom={10}
          w={"60%"}
          m={"auto"}
          zIndex={14}
          right={40}
        >
          {selectSlots.length > 0 && (
            <Link href={"Admin-calander"}>
              <Button w={"100%"} bg={"rgba(0, 0, 255, 0.2)"} borderWidth={1}>
                Select date
              </Button>
            </Link>
          )}
        </Box>
      </Box>

      {/* <AdminCalander /> */}
    </AdminLayout>
  );
}

export default AdminSchedule;
