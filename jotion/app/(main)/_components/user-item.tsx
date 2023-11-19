"use client";

import { Avatar, Button, Flex, HStack, Icon, Portal, Text } from "@chakra-ui/react";
import { useUser } from "@clerk/clerk-react";
import { ChevronsLeftRight } from "lucide-react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";

const UserItem = () => {
  const { user } = useUser();

  return (
    <Menu placement="bottom">
      <MenuButton
        w="full"
        p={4}
        _hover={{
          bg: "bg.subtle",
        }}
      >
        <Flex align="center">
          <HStack align="center" spacing={2} maxW={150}>
            <Avatar h={5} w={5} src={user?.imageUrl} />
            <Text textAlign="start" fontWeight="medium" noOfLines={1}>
              {user?.firstName}&apos;s Jotion
            </Text>
          </HStack>
          <Icon
            as={ChevronsLeftRight}
            ml={2}
            mt={0.5}
            className="rotate-90"
            color="fg.muted"
            h={4}
            w={4}
          />
        </Flex>
      </MenuButton>
      <Portal>
        <MenuList zIndex="popover">
          <MenuItem>Download</MenuItem>
          <MenuItem>Create a Copy</MenuItem>
          <MenuItem>Mark as Draft</MenuItem>
          <MenuItem>Delete</MenuItem>
          <MenuItem>Attend a Workshop</MenuItem>
        </MenuList>
      </Portal>
    </Menu>
  );
};

export default UserItem;
