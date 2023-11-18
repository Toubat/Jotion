"use client";
import { Box, Button, Heading, useColorModeValue } from "@chakra-ui/react";
import { ArrowRight } from "lucide-react";

export const Header = () => {
  const buttonBg = useColorModeValue("zinc.800", "zinc.100");
  const buttonHoverBg = useColorModeValue("zinc.700", "zinc.200");
  const buttonText = useColorModeValue("white", "zinc.800");

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
      <Button variant="solid" bg={buttonBg} _hover={{ bg: buttonHoverBg }} color="fg.inverted">
        Enter Jotion <ArrowRight className="h-4 w-4 ml-2" />
      </Button>
    </Box>
  );
};
