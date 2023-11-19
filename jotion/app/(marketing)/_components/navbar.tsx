"use client";

import { useConvexAuth } from "convex/react";
import { useScrollTop } from "@/hooks/use-scroll-top";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import {
  Button,
  Flex,
  HStack,
  Icon,
  IconButton,
  Spinner,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "lucide-react";
import Logo from "./logo";
import NextLink from "next/link";

export const Navbar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const scrolled = useScrollTop();
  const ThemeIcon = useColorModeValue(SunIcon, MoonIcon);
  const buttonBg = useColorModeValue("gray.800", "gray.50");
  const buttonHoverBg = useColorModeValue("gray.700", "gray.300");
  const { toggleColorMode } = useColorMode();

  return (
    <Flex
      zIndex="sticky"
      position="fixed"
      top={0}
      align="center"
      w="full"
      px={6}
      py={4}
      bg="bg.surface"
      borderBottom={scrolled ? 1 : "none"}
      shadow={scrolled ? "sm" : "none"}
    >
      <Logo />
      <Flex
        flex={1}
        justify={{
          base: "space-between",
          md: "flex-end",
        }}
        align="center"
        rowGap={2}
      >
        <HStack spacing={2} align="center">
          {isLoading && <Spinner size="sm" />}
          {!isAuthenticated && !isLoading && (
            <>
              <SignInButton mode="modal">
                <Button variant="ghost" colorScheme="gray" fontSize="md">
                  Login
                </Button>
              </SignInButton>
              <SignInButton mode="modal">
                <Button
                  variant="solid"
                  bg={buttonBg}
                  _hover={{
                    bg: buttonHoverBg,
                  }}
                  size="sm"
                >
                  Get Jotion free
                </Button>
              </SignInButton>
            </>
          )}
          {isAuthenticated && !isLoading && (
            <>
              <Button
                as={NextLink}
                href="/documents"
                variant="tertiary"
                colorScheme="dark"
                size="sm"
              >
                Enter Jotion
              </Button>
              <UserButton afterSignOutUrl="/" />
            </>
          )}
          <IconButton
            variant="tertiary"
            aria-label="Toggle color mode"
            icon={<Icon as={ThemeIcon} />}
            onClick={toggleColorMode}
          />
        </HStack>
      </Flex>
    </Flex>
  );
};
