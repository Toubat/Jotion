import { Box } from "@chakra-ui/react";
import { Navbar } from "./_components/navbar";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box h="full">
      <Navbar />
      <main className="h-full">{children}</main>
    </Box>
  );
};

export default MarketingLayout;
