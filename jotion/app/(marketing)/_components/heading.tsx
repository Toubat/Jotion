"use client";
import { Box, Button, Flex, Heading, Spinner, useColorModeValue } from "@chakra-ui/react";
import { useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
import NextLink from "next/link";
import { SignInButton } from "@clerk/clerk-react";

export const Header = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <Box className="space-y-4" maxW="3xl">
      <Heading as="h1" size={{ base: "sm", sm: "md", md: "lg" }} fontWeight="bold">
        Your ideas, Documents, & plans. Unified. Welcome to{" "}
        <span className="underline">Jotion</span>
      </Heading>
      <Heading
        as="h3"
        fontSize={{
          base: "md",
          sm: "xl",
          md: "2xl",
        }}
        fontWeight="medium"
        lineHeight="1.5"
      >
        Jotion is the connected work space where <br /> better faster work happens
      </Heading>
      {isLoading && (
        <Flex align="center" justify="center" w="full">
          <Spinner size="lg" />
        </Flex>
      )}
      {isAuthenticated && !isLoading && (
        <Button as={NextLink} href="/documents" variant="inverted" color="fg.inverted">
          Enter Jotion <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      )}
      {!isAuthenticated && !isLoading && (
        <SignInButton mode="modal">
          <Button variant="inverted" color="fg.inverted" colorScheme="gray" fontSize="md">
            Get Jotion free
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </SignInButton>
      )}
    </Box>
  );
};
