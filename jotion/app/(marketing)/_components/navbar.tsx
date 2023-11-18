"use client";

import { useScrollTop } from "@/hooks/use-scroll-top";
import {
  Button,
  Flex,
  HStack,
  Icon,
  IconButton,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "lucide-react";
import Logo from "./logo";

export const Navbar = () => {
  const scrolled = useScrollTop();
  const ThemeIcon = useColorModeValue(SunIcon, MoonIcon);
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
          <IconButton
            variant="tertiary"
            aria-label="Toggle color mode"
            icon={<Icon as={ThemeIcon} />}
            onClick={toggleColorMode}
          />
          <Button variant="secondary" fontSize="md">
            Login
          </Button>
        </HStack>
      </Flex>
    </Flex>
  );
};
