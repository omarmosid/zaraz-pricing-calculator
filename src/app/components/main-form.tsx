"use client";

import {
  Box,
  Button,
  ButtonGroup,
  Heading,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";

type MainFormProps = {};

type FormFields = {
  hasWorkersPaid: boolean;
  loads: number;
};

const roundToTwoDecimalPlaces = (num: number): number => {
  // Use the toFixed method to round to two decimal places
  const roundedNum = Number(num.toFixed(2));
  return roundedNum;
};

const getPrice = (form: FormFields) => {
  const loadLimit = form.hasWorkersPaid ? 200000 : 100000;
  const exceededLoads = form.loads - loadLimit;

  if (exceededLoads < 0) {
    return 0;
  }

  const finalPrice = roundToTwoDecimalPlaces((exceededLoads / 1000) * 0.5);
  return finalPrice;
};

const labelStyles = {
  mt: "2",
  ml: "-2.5",
  fontSize: "sm",
};

const MainForm: React.FC<MainFormProps> = () => {
  const [form, setForm] = useState({
    hasWorkersPaid: false,
    loads: 50000,
  });

  const [showTooltip, setShowTooltip] = useState(false);

  const finalPrice = getPrice(form);

  return (
    <>
      <Heading fontSize="4xl" my={12}>
        Find out how much you will have to pay for Zaraz after Sep 20th
      </Heading>
      <VStack alignItems="flex-start" gap={12}>
        <Box>
          <Text fontSize="xl" mb={4}>
            Do you have Workers paid?
          </Text>
          <ButtonGroup spacing={0}>
            <Button
              borderRadius={0}
              colorScheme={form.hasWorkersPaid ? "blue" : "gray"}
              onClick={(e) => setForm({ ...form, hasWorkersPaid: true })}
            >
              Yes
            </Button>
            <Button
              borderRadius={0}
              colorScheme={form.hasWorkersPaid ? "gray" : "blue"}
              onClick={(e) => setForm({ ...form, hasWorkersPaid: false })}
            >
              No
            </Button>
          </ButtonGroup>
        </Box>

        <Box>
          <Text fontSize="xl" mb={4}>
            How many Zaraz page loads do you expect to see?
          </Text>
          <Slider
            aria-label="slider-ex-1"
            min={0}
            max={1000000}
            step={10000}
            value={form.loads}
            onChange={(value) => setForm({ ...form, loads: value })}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <SliderMark value={0} {...labelStyles}>
              0
            </SliderMark>
            <SliderMark
              value={form.hasWorkersPaid ? 200000 : 100000}
              {...labelStyles}
              color="red"
              fontWeight="bold"
            >
              {form.hasWorkersPaid ? "200k" : "100k"}
            </SliderMark>
            <SliderMark value={500000} {...labelStyles}>
              500K
            </SliderMark>
            <SliderMark value={1000000} {...labelStyles}>
              1M
            </SliderMark>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <Tooltip
              hasArrow
              bg="teal.500"
              color="white"
              placement="top"
              isOpen={showTooltip}
              label={`${form.loads}`}
            >
              <SliderThumb boxSize={4} bgColor="blue" />
            </Tooltip>
          </Slider>
        </Box>

        <Box mt={8} className="estimate">
          <Text>For {form.loads} loads, Zaraz will cost you:</Text>
          <Text fontSize="6xl" display="inline">
            ${finalPrice}/
          </Text>
          <Text display="inline">per month</Text>
        </Box>
      </VStack>
    </>
  );
};

export { MainForm };
