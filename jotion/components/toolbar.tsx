"use client";

import { Doc } from "@/convex/_generated/dataModel";
import { Box, Flex } from "@chakra-ui/react";

interface ToolbarProps {
  initialData: Doc<"documents">;
  preview?: boolean;
}

const Toolbar: React.FC<ToolbarProps> = ({ initialData, preview }) => {
  return (
    <Box pl={54} className="group" pos="relative">
      {!!initialData.icon && !preview && (
        <Flex className="group/icon" align="center" columnGap={2}></Flex>
      )}
    </Box>
  );
};

export default Toolbar;
