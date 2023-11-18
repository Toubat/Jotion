"use client";
import {
  Button,
  Box,
  useColorMode,
  Tabs,
  Tab,
  TabList,
  Container,
  Stack,
  TabIndicator,
} from "@chakra-ui/react";
import {} from "@chakra-ui/react";

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box>
      <Button m={2} variant="primary" onClick={toggleColorMode}>
        {colorMode}
      </Button>
    </Box>
  );
}
