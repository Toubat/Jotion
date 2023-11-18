import { theme as proTheme } from "@/theme";
import { extendTheme, theme as baseTheme } from "@chakra-ui/react";

const slate = {
  50: "#f8fafc",
  100: "#f1f5f9",
  200: "#e2e8f0",
  300: "#cbd5e1",
  400: "#94a3b8",
  500: "#64748b",
  600: "#475569",
  700: "#334155",
  800: "#1e293b",
  900: "#0f172a",
  950: "#020617",
};

const dark = {
  50: "#C1C2C5",
  100: "#A6A7AB",
  200: "#909296",
  300: "#5C5F66",
  400: "#373A40",
  500: "#2C2E33",
  600: "#25262B",
  700: "#1A1B1E",
  800: "#141517",
  900: "#101113",
  950: "#070708",
};

const gray = {
  50: "#f8f9fa",
  100: "#f1f3f5",
  200: "#e9ecef",
  300: "#dee2e6",
  400: "#ced4da",
  500: "#adb5bd",
  600: "#868e96",
  700: "#495057",
  800: "#343a40",
  900: "#212529",
  950: "#070708",
};

const zinc = {
  50: "#fafafa",
  100: "#f4f4f5",
  200: "#e4e4e7",
  300: "#d4d4d8",
  400: "#a1a1aa",
  500: "#71717a",
  600: "#52525b",
  700: "#3f3f46",
  800: "#27272a",
  900: "#18181b",
  950: "#09090b",
};

const neutral = {
  50: "#fafafa",
  100: "#f5f5f5",
  200: "#e5e5e5",
  300: "#d4d4d4",
  400: "#a3a3a3",
  500: "#737373",
  600: "#525252",
  700: "#404040",
  800: "#262626",
  900: "#171717",
  950: "#0a0a0a",
};

export default extendTheme({
  ...proTheme,
  colors: {
    ...baseTheme.colors,
    slate,
    gray,
    dark,
    zinc,
    neutral,
    brand: baseTheme.colors.blue,
  },
});
