import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { Editable, EditableInput, EditablePreview, Flex, Text } from "@chakra-ui/react";
import { useMutation } from "convex/react";
import { useState } from "react";

interface TitleProps {
  initialData: Doc<"documents">;
}

const Title = ({ initialData }: TitleProps) => {
  const update = useMutation(api.documents.update);
  const [title, setTitle] = useState(initialData.title || "Untitled");

  const onChange = (value: string) => {
    const newValue = value.length > 0 ? value : "Untitled";

    setTitle(newValue);
    update({
      id: initialData._id,
      title: newValue,
    });
  };

  return (
    <Flex align="center" columnGap={1}>
      {!!initialData.icon && <Text as="span">{initialData.icon}</Text>}
      <Editable defaultValue={title} w="60" onChange={onChange}>
        <EditablePreview
          px={2}
          _hover={{
            bg: "bg.subtle",
          }}
          rounded="sm"
          noOfLines={1}
        />
        <EditableInput
          isTruncated
          rounded="sm"
          px={2}
          //   _focus={{
          //     boxShadow: "none !important",
          //   }}
        />
      </Editable>
    </Flex>
  );
};

export default Title;
