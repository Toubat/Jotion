"use client";
import { Image as ChakraNextImage } from "@chakra-ui/next-js";
import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import NextImage from "next/image";

const Heroes = () => {
  const documentImage = useColorModeValue("/documents.png", "/documents-dark.png");
  const readingImage = useColorModeValue("/reading.png", "/reading-dark.png");

  return (
    <Flex flexDir="column" align="center" justify="center" maxW="5xl">
      <Flex align="center">
        <Box
          position="relative"
          h={{
            base: 300,
            sm: 350,
            md: 400,
          }}
          w={{
            base: 300,
            sm: 350,
            md: 400,
          }}
        >
          <ChakraNextImage
            className="object-contain"
            as={NextImage}
            src={documentImage}
            fill
            alt="Documents"
          />
        </Box>
        <Box
          position="relative"
          h={400}
          w={400}
          display={{
            base: "none",
            md: "block",
          }}
        >
          <ChakraNextImage
            className="object-contain"
            as={NextImage}
            src={readingImage}
            fill
            alt="Reading"
          />
        </Box>
      </Flex>
    </Flex>
  );
};

export default Heroes;
