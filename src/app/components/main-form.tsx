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
import millify from "millify";

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

const getCompetitorPrice = (form: FormFields) => {
  const traffic = form.loads;
  const egressCost = traffic * 0.0012;
  const maintenanceCosts = traffic / 10000;
  return roundToTwoDecimalPlaces(egressCost + maintenanceCosts);
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
  const compPrice = getCompetitorPrice(form);

  return (
    <>
      <Heading fontSize="4xl" my={12}>
        Find out how much you will have to pay for Zaraz after Sep 20th
      </Heading>
      <VStack alignItems="flex-start" gap={8}>
        <Box>
          <Text fontSize="xl" mb={4}>
            Do you have Workers Pro Plan?
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

        <Box w="60%">
          <Text fontSize="xl" mb={4}>
            How much traffic do you roughly get on your website?
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
              {form.hasWorkersPaid ? "200K" : "100K"}
            </SliderMark>
            <SliderMark value={500000} {...labelStyles}>
              500K
            </SliderMark>
            <SliderMark value={750000} {...labelStyles}>
              750K
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
              label={`${millify(form.loads)}`}
            >
              <SliderThumb boxSize={4} bgColor="blue" />
            </Tooltip>
          </Slider>
        </Box>

        <Box mt={8} className="estimate">
          <Text>
            {finalPrice > 0
              ? `For ${millify(form.loads)} loads, Zaraz will cost you:`
              : `Yay! For ${millify(form.loads)} loads, Zaraz is free for you!`}
          </Text>
          <Text fontSize="5xl" display="inline">
            ${finalPrice}/
          </Text>
          <Text display="inline">per month</Text>
        </Box>

        <Box mt={4} className="estimate">
          <Text>
            For the same amount of traffic, A self hosted server side tag
            managment tool might cost you:
          </Text>
          <Text fontSize="5xl" display="inline" color="red">
            ${compPrice}/
          </Text>
          <Text display="inline">per month*</Text>
          <Text fontSize="xs">
            *this is a rough estimate that includes infrastructure and
            maintenance costs
          </Text>
        </Box>

        <Box mt={4} className="estimate">
          <Text>By choosing to use Zaraz you stand to save</Text>
          <Text fontSize="5xl" display="inline" color="green">
            ${compPrice - finalPrice}/
          </Text>
          <Text display="inline">per month*</Text>
        </Box>
      </VStack>
    </>
  );
};

export { MainForm };
