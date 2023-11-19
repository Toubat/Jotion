"use client";
import { Box, useColorMode } from "@chakra-ui/react";

const DocumentPage = () => {
  const { toggleColorMode } = useColorMode();
  return <Box onClick={toggleColorMode}>This is a protected DocumentPage</Box>;
};

export default DocumentPage;
