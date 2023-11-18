import { Image as ChakraNextImage } from "@chakra-ui/next-js";
import { Box, Flex, Text } from "@chakra-ui/react";
import NextImage from "next/image";
import { Poppins } from "next/font/google";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

const Logo = () => {
  return (
    <Box
      display={{
        base: "none",
        md: "flex",
      }}
      alignItems="center"
      columnGap={2}
    >
      <ChakraNextImage as={NextImage} src="/logo.svg" height={8} width={8} alt="Logo" />
      <Text fontWeight="semibold" className={font.className}>
        Jotion
      </Text>
    </Box>
  );
};

export default Logo;
