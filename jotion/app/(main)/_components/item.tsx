import { ChevronDown, ChevronRight, LucideIcon } from "lucide-react";
import { forwardRef, Flex, FlexProps, Icon, Box, Kbd } from "@chakra-ui/react";
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
  ) => {
    const ChevronIcon = expanded ? ChevronDown : ChevronRight;

    return (
      <Flex
        className="transition-all ease-in-out duration-300"
        pl={level ? `${level * 0.75 + 0.75}rem` : "0.75rem"}
        py={1}
        pr={3}
        w="full"
        minH={27}
        fontSize="sm"
        align="center"
        color="fg.muted"
        cursor="pointer"
        onClick={onExpand}
        ref={ref}
        bg={active ? "bg.subtle" : "undefined"}
        _hover={{
          bg: "bg.subtle",
        }}
        {...rest}
      >
        {!!id && (
          <Box rounded="sm" mr={1} h="full" onClick={() => {}}>
            <Icon as={ChevronIcon} h={4} w={4} flexShrink={0} color="fg.muted" />
          </Box>
        )}
        {documentIcon ? (
          <Box flexShrink={0} mr={2} fontSize="sm" color="fg.muted" fontWeight="medium">
            {documentIcon}
          </Box>
        ) : (
          <Icon as={LucideIcon} flexShrink={0} h={18} mr={2} color="fg.muted" fontWeight="medium" />
        )}
        <Box isTruncated color="fg.muted" fontWeight="medium">
          {label}
        </Box>
        {isSearch && (
          <Box
            as="span"
            pt={0.5}
            ml="auto"
            pointerEvents="none"
            userSelect="none"
            rounded="sm"
            color="fg.muted"
            display="inline-flex"
            alignItems="center"
            columnGap={1}
          >
            <Kbd>⌘</Kbd> + <Kbd>K</Kbd>
          </Box>
        )}
      </Flex>
    );
  }
);

export default Item;
