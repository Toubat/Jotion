"use client";

import { Popover, PopoverContent, PopoverTrigger, useColorMode } from "@chakra-ui/react";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { useCallback, useMemo } from "react";

interface IconPickerProps {
  onChange: (icon: string) => void;
  children: React.ReactNode;
}

export const IconPicker: React.FC<IconPickerProps> = ({ onChange, children }) => {
  const { colorMode } = useColorMode();

  const theme = useMemo(() => {
    return colorMode === "light" ? Theme.LIGHT : Theme.DARK;
  }, [colorMode]);

  const Picker = useCallback(() => {
    return <EmojiPicker height={350} theme={theme} onEmojiClick={(data) => onChange(data.emoji)} />;
  }, [theme, onChange]);

  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent p={0} w="full" bg="bg.surface">
        <Picker />
      </PopoverContent>
    </Popover>
  );
};

export default IconPicker;
