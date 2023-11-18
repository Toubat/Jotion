import { Box, Button, Flex, ThemeTypings } from "@chakra-ui/react";
import Logo from "./logo";

const Footer = () => {
  return (
    <Flex align="center" w="full" p={6} zIndex={50}>
      <Logo />
      <Flex
        ml={{
          base: "none",
          md: "auto",
        }}
        w={{
          base: "full",
          md: "fit-content",
        }}
        justify="space-between"
        align="center"
        columnGap={2}
      >
        <Button colorScheme="gray" variant="ghost" size="sm" color="fg.muted">
          Privacy Policy
        </Button>
        <Button colorScheme="gray" variant="ghost" size="sm" color="fg.muted">
          Terms & Conditions
        </Button>
      </Flex>
    </Flex>
  );
};

export default Footer;
