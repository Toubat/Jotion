import { LucideIcon } from "lucide-react";
import { forwardRef, Flex, FlexProps, Icon, Box } from "@chakra-ui/react";
import { Id } from "@/convex/_generated/dataModel";

interface ItemProps {
  id?: Id<"documents">;
  icon: LucideIcon;
  label: string;
  documentIcon?: string;
  active?: boolean;
  expanded?: boolean;
  isSearch?: boolean;
  level?: number;
  onExpand?: () => void;
}

const Item = forwardRef<FlexProps & ItemProps, "div">(
  (
    {
      children,
      label,
      icon: LucideIcon,
      id,
      documentIcon,
      active,
      expanded,
      isSearch,
      level,
      onExpand,
      ...rest
    },
    ref
  ) => (
    <Flex
      className="transition-all ease-in-out duration-300"
      minH={27}
      fontSize="sm"
      py={1}
      pl={3}
      pr={3}
      w="full"
      align="center"
      color="fg.muted"
      cursor="pointer"
      _hover={{
        bg: "bg.subtle",
      }}
      ref={ref}
      {...rest}
    >
      <Icon as={LucideIcon} flexShrink={0} h={18} mr={2} color="fg.muted" />
      <Box as="span" isTruncated>
        {label}
      </Box>
    </Flex>
  )
);

export default Item;
