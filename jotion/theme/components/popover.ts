import { popoverAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, defineStyle } from "@chakra-ui/styled-system";

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(parts.keys);

const baseStyleContent = defineStyle({
  bg: "bg.surface",
  overflow: "hidden",
});

const baseStyle = definePartsStyle({
  content: baseStyleContent,
});

export default defineMultiStyleConfig({
  baseStyle,
});
