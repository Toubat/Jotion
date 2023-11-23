"use client";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { HStack, useToast, Text, Button } from "@chakra-ui/react";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";

interface BannerProps {
  documentId: Id<"documents">;
}

const Banner = ({ documentId }: BannerProps) => {
  const router = useRouter();
  const toast = useToast();
  const remove = useMutation(api.documents.remove);
  const restore = useMutation(api.documents.restore);

  const onRemove = () => {
    const promise = remove({ id: documentId });

    toast.promise(promise, {
      loading: {
        title: "Document Remove",
        description: "Removing document...",
      },
      success: {
        title: "Document Remove Success",
        description: "Document removed successfully",
      },
      error: {
        title: "Document Remove Error",
        description: "Error removing document",
      },
    });

    router.push("/documents");
  };

  const onRestore = () => {
    const promise = restore({ id: documentId });

    toast.promise(promise, {
      loading: {
        title: "Document Restore",
        description: "Restoring document...",
      },
      success: {
        title: "Document Restore Success",
        description: "Document restored successfully",
      },
      error: {
        title: "Document Restore Error",
        description: "Error restoring document",
      },
    });
  };

  return (
    <HStack bg="red.400" py={2} justify="center">
      <Text color="white">This page is in the Trash.</Text>
      <Button
        ml={2}
        variant="outline"
        size="xs"
        color="white"
        _hover={{
          bg: "red.500",
        }}
        onClick={onRestore}
      >
        Restore page
      </Button>
      <ConfirmModal onConfirm={onRemove}>
        <Button
          variant="outline"
          size="xs"
          color="white"
          _hover={{
            bg: "red.500",
          }}
        >
          Delete forever
        </Button>
      </ConfirmModal>
    </HStack>
  );
};

export default Banner;
