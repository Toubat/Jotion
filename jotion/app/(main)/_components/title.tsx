import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { Editable, EditableInput, EditablePreview, Flex, Text } from "@chakra-ui/react";
import { useMutation } from "convex/react";
import { useEffect, useState } from "react";

interface TitleProps {
  initialData: Doc<"documents">;
}

const Title = ({ initialData }: TitleProps) => {
  const update = useMutation(api.documents.update);
  const [value, setValue] = useState(initialData.title);

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

  return (
    <Flex align="center" columnGap={1}>
      {!!initialData.icon && (
        <Text as="span" fontSize="lg">
          {initialData.icon}
        </Text>
      )}
      <Editable value={value} w="60" onChange={onChange} fontWeight="medium" pl={1}>
        <EditablePreview
          px={1}
          _hover={{
            bg: "bg.subtle",
          }}
          rounded="sm"
          noOfLines={1}
        />
        <EditableInput isTruncated rounded="sm" px={2} />
      </Editable>
    </Flex>
  );
};

export default Title;
