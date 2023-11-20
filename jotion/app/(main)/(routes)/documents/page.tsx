"use client";
import {
  Button,
  Flex,
  Heading,
  IconButton,
  useColorMode,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { Image as ChakraNextImage } from "@chakra-ui/next-js";
import NextImage from "next/image";
import { useUser } from "@clerk/clerk-react";
import { PlusCircle } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

const DocumentPage = () => {
  const { user } = useUser();
  const { toggleColorMode } = useColorMode();
  const toast = useToast();

  const emptyImageUrl = useColorModeValue("/empty.png", "/empty-dark.png");
  const create = useMutation(api.documents.create);

  const onCreate = () => {
    const promose = create({
      title: "Untitled",
    });

    toast.promise(promose, {
      loading: {
        title: "Note Create",
        description: "Creating a new note...",
      },
      success: {
        title: "Note Create Success",
        description: "Your note has been created.",
      },
      error: {
        title: "Note Create Failed",
        description: "Something went wrong while creating your note.",
      },
    });
  };

  return (
    <Flex h="full" flexDir="column" align="center" justify="center">
      <Button variant="tertiary" onClick={toggleColorMode}>
        Toggle
      </Button>
      <ChakraNextImage
        as={NextImage}
        className="object-contain"
        src={emptyImageUrl}
        alt="Empty"
        width={300}
        height={300}
      />
      <Heading as="h2" fontSize="xl">
        Welcome to {user?.firstName}&apos;s Jotion
      </Heading>
      <Button variant="inverted" onClick={onCreate}>
        <PlusCircle className="h-4 w-4 mr-2" />
        Create a note
      </Button>
    </Flex>
  );
};

export default DocumentPage;
