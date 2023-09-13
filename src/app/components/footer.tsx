import { Box, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

type FooterProps = {};

const Footer: React.FC<FooterProps> = () => {
  return (
    <>
      <Box pt={10}>
        <Text fontSize="xs">
          Made by{" "}
          <a
            href="https://omarmo.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Omar
          </a>
          <br />
          See the fine print <Link href="/fine-print">here</Link>
        </Text>
      </Box>
    </>
  );
};

export { Footer };
