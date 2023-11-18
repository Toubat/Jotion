"use client";
import { Header } from "./_components/heading";
import { Box, Flex, useColorMode } from "@chakra-ui/react";
import Heroes from "./_components/heroes";
import Footer from "./_components/footer";

const MarketingPage = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex minH="full" flexDir="column">
      <Flex
        flexDir="column"
        align="center"
        justify="center"
        textAlign="center"
        rowGap={8}
        flex={1}
        px={6}
        pb={10}
      >
        <Header />
        <Heroes />
      </Flex>
      <Footer />
    </Flex>
  );
};

export default MarketingPage;
