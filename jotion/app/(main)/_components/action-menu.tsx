"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import {
  Box,
  Button,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useToast,
} from "@chakra-ui/react";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { ChevronDownIcon, MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";

interface ActionMenuProps {
  documentId: Id<"documents">;
}

const ActionMenu = ({ documentId }: ActionMenuProps) => {
  const router = useRouter();
  const toast = useToast();
  const { user } = useUser();
  const archive = useMutation(api.documents.archive);

  const onArchive = () => {
    const promise = archive({ id: documentId }).then(() => {
      router.push(`/documents`);
    });

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

    router.push("/documents");
  };

  return (
    <Menu>
      <MenuButton
        variant="tertiary"
        as={IconButton}
        icon={<Icon as={MoreHorizontal} />}
        size="sm"
      />
      <MenuList bg="bg.surface" p={1}>
        <MenuItem
          bg="bg.surface"
          _hover={{
            bg: "bg.subtle",
          }}
          rounded="md"
          px={2}
          py={1}
          onClick={onArchive}
        >
          <Icon as={Trash} mr={2} />
          Delete
        </MenuItem>
        <MenuDivider m={1} />
        <Box fontSize="xs" color="fg.muted" px={2}>
          Last edited by: {user?.fullName}
        </Box>
      </MenuList>
    </Menu>
  );
};

export default ActionMenu;
