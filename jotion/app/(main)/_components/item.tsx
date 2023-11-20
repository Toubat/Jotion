import { LucideIcon } from "lucide-react";
import { forwardRef, Flex, FlexProps, Icon, Box } from "@chakra-ui/react";

const Item = forwardRef<
  FlexProps & {
    icon: LucideIcon;
    label: string;
  },
  "div"
>(({ children, label, icon: LucideIcon, ...rest }, ref) => (
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
));

export default Item;
