"use client";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import {
  Box,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  useToast,
  Text,
  VStack,
  Button,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "convex/react";
import { SearchIcon, TrashIcon, UndoIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";

const TrashBox = ({
  onModalOpen,
  onModalClose,
}: {
  onModalOpen: () => void;
  onModalClose: () => void;
}) => {
  const router = useRouter();
  const params = useParams();
  const toast = useToast();
  const documents = useQuery(api.documents.getTrash);
  const restore = useMutation(api.documents.restore);
  const remove = useMutation(api.documents.remove);

  const [search, setSearch] = useState("");
  const iconButtonHoverBg = useColorModeValue("gray.400", "whiteAlpha.200");

  const filteredDocuments = useMemo(() => {
    return documents?.filter((document) => {
      return document.title.toLowerCase().includes(search.toLowerCase());
    });
  }, [documents, search]);

  const onClick = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  const onRestore = (event: React.MouseEvent, documentId: Id<"documents">) => {
    event.stopPropagation();
    const promise = restore({ id: documentId });

    toast.promise(promise, {
      loading: {
        title: "Document Restore",
        description: "Restoring document...",
      },
      success: {
        title: "Document Restore Success",
        description: "Document restored successfully!",
      },
      error: {
        title: "Document Restore Failed",
        description: "Failed to restore document.",
      },
    });
  };

  const onRemove = (documentId: Id<"documents">) => {
    const promise = remove({ id: documentId });

    toast.promise(promise, {
      loading: {
        title: "Document Delete",
        description: "Deleting document...",
      },
      success: {
        title: "Document Delete Success",
        description: "Document deleted successfully!",
      },
      error: {
        title: "Document Delete Failed",
        description: "Failed to delete document.",
      },
    });

    if (params.documentId === documentId) {
      router.push("/documents");
    }
  };

  if (documents === undefined) {
    return (
      <Flex h="full" align="center" justify="center" p={4}>
        <Spinner size="lg" />
      </Flex>
    );
  }

  return (
    <VStack fontSize="sm" spacing={0}>
      <InputGroup size="sm">
        <InputLeftElement pointerEvents="none" fontSize="sm" mt={0.5}>
          <Icon as={SearchIcon} />
        </InputLeftElement>
        <Input
          variant="filled"
          rounded="sm"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Filter by page title..."
        />
      </InputGroup>
      <VStack mt={2} w="full" spacing={0}>
        <Text fontWeight="md" size="xs" color="fg.muted" className="hidden last:block">
          No documents found.
        </Text>
        {filteredDocuments?.map((document) => {
          return (
            <Flex
              className="transition-all ease-in-out duration-300"
              as="button"
              key={document._id}
              onClick={() => onClick(document._id)}
              fontSize="sm"
              fontWeight="medium"
              color="fg.muted"
              rounded="sm"
              w="full"
              justify="space-between"
              align="center"
              p={1}
              px={2}
              _hover={{
                bg: "bg.subtle",
              }}
            >
              <Text as="span" isTruncated>
                {document.title}
              </Text>
              <HStack>
                <Box
                  className="transition-all ease-in-out duration-300"
                  as="button"
                  rounded="sm"
                  onClick={(e) => onRestore(e, document._id)}
                  _hover={{
                    bg: iconButtonHoverBg,
                  }}
                  w={5}
                  h={5}
                >
                  <Icon as={UndoIcon} mb={1} size="sm" />
                </Box>
                <ConfirmModal
                  onModalOpen={onModalOpen}
                  onModalClose={onModalClose}
                  onConfirm={() => onRemove(document._id)}
                >
                  <Box
                    className="transition-all ease-in-out duration-300"
                    as="button"
                    rounded="sm"
                    _hover={{
                      bg: iconButtonHoverBg,
                    }}
                    w={5}
                    h={5}
                  >
                    <Icon as={TrashIcon} mb={1} size="sm" />
                  </Box>
                </ConfirmModal>
              </HStack>
            </Flex>
          );
        })}
      </VStack>
    </VStack>
  );
};

export default TrashBox;
