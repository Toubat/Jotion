"use client";
import {
  Button,
  Flex,
  Heading,
  IconButton,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { Image as ChakraNextImage } from "@chakra-ui/next-js";
import NextImage from "next/image";
import { useUser } from "@clerk/clerk-react";
import { PlusCircle } from "lucide-react";

const DocumentPage = () => {
  const { toggleColorMode } = useColorMode();
  const empty = useColorModeValue("/empty.png", "/empty-dark.png");
  const { user } = useUser();

  return (
    <Flex h="full" flexDir="column" align="center" justify="center">
      <ChakraNextImage
        as={NextImage}
        className="object-contain"
        src={empty}
        alt="Empty"
        width={300}
        height={300}
      />
      <Heading as="h2" fontSize="xl">
        Welcome to {user?.firstName}&apos;s Jotion
      </Heading>
      <Button variant="inverted" onClick={toggleColorMode}>
        <PlusCircle className="h-4 w-4 mr-2" />
        Create a note
      </Button>
    </Flex>
  );
};

export default DocumentPage;
