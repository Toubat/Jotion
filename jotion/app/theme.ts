import { theme as proTheme } from "@/theme";
import { extendTheme, theme as baseTheme } from "@chakra-ui/react";

export default extendTheme(
  {
    colors: { ...baseTheme.colors, brand: baseTheme.colors.blue },
  },
  proTheme
);
