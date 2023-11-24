"use client";

import { Doc } from "@/convex/_generated/dataModel";
import {
  Box,
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Icon,
  IconButton,
  Text,
} from "@chakra-ui/react";
import IconPicker from "./icon-picker";
import { ImageIcon, Smile, X } from "lucide-react";
import { ElementRef, useEffect, useRef, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useCoverImage } from "@/hooks/use-cover-image";

interface ToolbarProps {
  initialData: Doc<"documents">;
  preview?: boolean;
}

const Toolbar: React.FC<ToolbarProps> = ({ initialData, preview }) => {
  const update = useMutation(api.documents.update);
  const removeIcon = useMutation(api.documents.removeIcon);
  const [value, setValue] = useState(initialData.title);
  const coverImage = useCoverImage();

  useEffect(() => {
    setValue(initialData.title);
  }, [initialData.title]);

  const onChange = (value: string) => {
    const newValue = value.length > 0 ? value : "Untitled";
    setValue(newValue);
    update({
      id: initialData._id,
      title: newValue,
    });
  };

  const onIconSelect = (icon: string) => {
    console.log(icon);
    update({
      id: initialData._id,
      icon,
    });
  };

  const onIconRemove = () => {
    removeIcon({
      id: initialData._id,
    });
  };

  return (
    <Box className="group" pos="relative" px={10}>
      {!!initialData.icon && !preview && (
        <Flex className="group/icon" align="center" columnGap={2} mt={8}>
          <IconPicker onChange={onIconSelect}>
            <Text
              className="transition"
              fontSize="4xl"
              _hover={{
                opacity: 0.75,
              }}
              cursor="pointer"
            >
              {initialData.icon}
            </Text>
          </IconPicker>
          <IconButton
            className="opacity-0 group-hover:opacity-100"
            aria-label="Remove Icon"
            icon={<Icon as={X} w={4} h={4} />}
            size="xs"
            colorScheme="gray"
            variant="ghost"
            onClick={onIconRemove}
          />
        </Flex>
      )}
      {!!initialData.icon && preview && (
        <Flex className="group/icon" align="center" columnGap={2} mt={8}>
          <Text className="transition" fontSize="4xl">
            {initialData.icon}
          </Text>
        </Flex>
      )}
      <Flex className="opacity-0 group-hover:opacity-100" align="center" columnGap={1}>
        {!initialData.icon && !preview && (
          <IconPicker onChange={onIconSelect}>
            <Button size="xs" variant="secondary" color="fg.muted" mt={4}>
              <Icon as={Smile} h={4} w={4} mr={2} /> Add icon
            </Button>
          </IconPicker>
        )}
        {!initialData.coverImage && !preview && (
          <Button size="xs" variant="secondary" color="fg.muted" onClick={coverImage.onOpen} mt={4}>
            <Icon as={ImageIcon} h={4} w={4} mr={2} /> Add cover
          </Button>
        )}
      </Flex>
      <Editable value={value} onChange={onChange} fontSize="5xl" fontWeight="bold" mt={2}>
        <EditablePreview noOfLines={1} />
        <EditableInput
          isTruncated
          rounded="sm"
          _focus={{
            boxShadow: "none !important",
          }}
        />
      </Editable>
    </Box>
  );
};

export default Toolbar;
