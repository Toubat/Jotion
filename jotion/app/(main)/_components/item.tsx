import React from "react";
import { ChevronDown, ChevronRight, LucideIcon, MoreHorizontal, Plus, Trash } from "lucide-react";
import {
  forwardRef,
  Flex,
  FlexProps,
  Icon,
  Box,
  Kbd,
  Skeleton,
  HStack,
  useColorModeValue,
  useToast,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Portal,
} from "@chakra-ui/react";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/clerk-react";

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

export const ItemSkeleton = ({ level }: { level: number }) => (
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
  >
    <Skeleton />
  </Flex>
);

export const Item = forwardRef<FlexProps & ItemProps, "div">(
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
    const toast = useToast();
    const router = useRouter();
    const { user } = useUser();
    const ChevronIcon = expanded ? ChevronDown : ChevronRight;
    const iconButtonHoverBg = useColorModeValue("gray.400", "whiteAlpha.200");
    const create = useMutation(api.documents.create);
    const archive = useMutation(api.documents.archive);

    const handleExpand = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event.stopPropagation();
      onExpand?.();
    };

    const onCreate = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event.stopPropagation();
      if (!id) return;

      const promise = create({ title: "Untitled", parentDocument: id }).then((documentId) => {
        if (!expanded) {
          onExpand?.();
        }
        // router.push(`/documents/${documentId}`);
      });

      toast.promise(promise, {
        loading: {
          title: "Note Create",
          description: "Creating a new note...",
        },
        success: {
          title: "Note Create Success",
          description: "Your note has been created.",
        },
        error: {
          title: "Note Create Failed",
          description: "Something went wrong while creating your note.",
        },
      });
    };

    const onArchive = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.stopPropagation();
      if (!id) return;

      const promise = archive({ id });
      toast.promise(promise, {
        loading: {
          title: "Note Delete",
          description: "Moving to trash...",
        },
        success: {
          title: "Note Delete Success",
          description: "Your note has been moved to trash.",
        },
        error: {
          title: "Note Delete Failed",
          description: "Something went wrong while moving your note to trash.",
        },
      });
    };

    return (
      <Flex
        className="group transition-all ease-in-out duration-300"
        pl={level ? `${level * 0.75 + 0.75}rem` : "0.75rem"}
        py={1}
        pr={3}
        w="full"
        minH={27}
        fontSize="sm"
        align="center"
        color="fg.muted"
        cursor="pointer"
        ref={ref}
        bg={active ? "bg.subtle" : "undefined"}
        _hover={{
          bg: "bg.subtle",
        }}
        {...rest}
      >
        {!!id && (
          <Flex
            className="transition-all ease-in-out duration-300"
            mr={1.5}
            onClick={handleExpand}
            rounded="sm"
            justify="center"
            align="center"
            color="fg.muted"
            _hover={{
              bg: iconButtonHoverBg,
            }}
            h={4}
            w={4}
          >
            <ChevronIcon className="h-3 w-3" />
          </Flex>
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
        {!!id && (
          <HStack ml="auto" spacing={1}>
            <Menu placement="right-start">
              <MenuButton
                className="opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-300"
                rounded="sm"
                color="fg.muted"
                _hover={{
                  bg: iconButtonHoverBg,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <Flex h={4} w={4} justify="center" align="center">
                  <Icon as={MoreHorizontal} />
                </Flex>
              </MenuButton>
              <Portal>
                <MenuList w={60} p={1.5} bg="bg.surface">
                  <MenuItem
                    rounded="md"
                    p={1}
                    px={2}
                    fontSize="sm"
                    fontWeight="medium"
                    bg="bg.surface"
                    _hover={{
                      bg: "gray.100",
                      _dark: {
                        bg: "bg.subtle",
                      },
                    }}
                    color="fg.muted"
                    onClick={onArchive}
                  >
                    <Icon as={Trash} h={4} w={4} mr={2} />
                    Delete
                  </MenuItem>
                  <MenuDivider m={1.5} />
                  <Box fontSize="xs" color="fg.muted" px={2} fontWeight="medium">
                    Last edited by: {user?.fullName}
                  </Box>
                </MenuList>
              </Portal>
            </Menu>
            <Flex
              className="opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-300"
              h={4}
              w={4}
              rounded="sm"
              justify="center"
              align="center"
              color="fg.muted"
              _hover={{
                bg: iconButtonHoverBg,
              }}
              onClick={onCreate}
            >
              <Icon as={Plus} />
            </Flex>
          </HStack>
        )}
      </Flex>
    );
  }
);
