"use client";
import { Box, Flex, Spinner } from "@chakra-ui/react";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import Navigation from "./_components/navigation";
import UserItem from "./_components/user-item";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return (
      <Flex h="full" align="center" justify="center">
        <Spinner size="lg" />
      </Flex>
    );
  }

  if (!isAuthenticated) {
    return redirect("/");
  }

  return (
    <Flex h="full" bg="bg.surface">
      <Navigation />
      <Box className="flex-1 h-full overflow-y-auto">{children}</Box>
    </Flex>
  );
};

export default MainLayout;
