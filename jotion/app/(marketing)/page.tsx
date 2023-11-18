"use client";
import { Header } from "./_components/heading";
import { Flex } from "@chakra-ui/react";
import Heroes from "./_components/heroes";
import Footer from "./_components/footer";

const MarketingPage = () => {
  return (
    <Flex minH="full" flexDir="column" bg="bg.surface">
      <Flex
        flexDir="column"
        align="center"
        justify="center"
        textAlign="center"
        rowGap={8}
        flex={1}
        px={6}
        pb={10}
        pt={20}
      >
        <Header />
        <Heroes />
      </Flex>
      <Footer />
    </Flex>
  );
};

export default MarketingPage;
