"use client";

import { Avatar, Box, Button, Flex, HStack, Icon, Portal, Text } from "@chakra-ui/react";
import { SignOutButton, useUser } from "@clerk/clerk-react";
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
            <Text textAlign="start" fontWeight="medium" noOfLines={1} color="fg.muted">
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
        <MenuList zIndex="popover" p={1.5} bg="bg.surface" w={80} ml={4}>
          <Flex flexDir="column" rowGap={3} p={0.5}>
            <Text className="leading-one" fontSize="xs" fontWeight="medium" color="fg.muted">
              {user?.emailAddresses[0].emailAddress}
            </Text>
            <Flex align="center" columnGap={2}>
              <Box p={1} bg="gray.50" rounded="md" _dark={{ bg: "whiteAlpha.200" }}>
                <Avatar h={6} w={6} src={user?.imageUrl} />
              </Box>
              <Text textAlign="center" fontWeight="medium" noOfLines={1} color="fg.muted">
                {user?.firstName}&apos;s Jotion
              </Text>
            </Flex>
          </Flex>
          <MenuDivider my={1.5} />
          <SignOutButton>
            <MenuItem
              rounded="md"
              bg="bg.surface"
              _hover={{
                bg: "gray.100",
                _dark: {
                  bg: "bg.subtle",
                },
              }}
              color="fg.muted"
              px={2}
              py={1}
            >
              Log out
            </MenuItem>
          </SignOutButton>
        </MenuList>
      </Portal>
    </Menu>
  );
};

export default UserItem;
