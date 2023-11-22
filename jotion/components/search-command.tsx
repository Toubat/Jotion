"use client";

import { useMemo } from "react";
import { useEffect, useState } from "react";
import { X, File, Search } from "lucide-react";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/clerk-react";

import { useSearch } from "@/hooks/use-search";
import { api } from "@/convex/_generated/api";
import {
  Flex,
  Input,
  Modal,
  ModalContent,
  ModalOverlay,
  VStack,
  Text,
  Icon,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  IconButton,
  Box,
  Divider,
} from "@chakra-ui/react";

const SearchCommand = () => {
  const { user } = useUser();
  const router = useRouter();
  const documents = useQuery(api.documents.getSearch);

  const [search, setSearch] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const { isOpen, toggle, onClose } = useSearch((store) => store);
  const [selected, setSelected] = useState();

  const filteredDocuments = useMemo(() => {
    return documents?.filter((document) => {
      return document.title.toLowerCase().includes(search.toLowerCase());
    });
  }, [documents, search]);

  const hasResult = useMemo(() => {
    return filteredDocuments && filteredDocuments.length > 0;
  }, [filteredDocuments]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const down = (e: any) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [toggle]);

  const onSelect = (id: string) => {
    router.push(`/documents/${id}`);
    onClose();
  };

  if (!isMounted) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay className="backdrop-blur-sm" />
      <ModalContent bg="bg.surface" border="1px" minW="700" borderColor="border.default">
        <Box p={1}>
          <InputGroup>
            <InputLeftElement>
              <Icon as={Search} h={4} w={4} />
            </InputLeftElement>
            <Input
              variant="unstyled"
              placeholder={`Search ${user?.fullName}'s Jotion...`}
              fontSize="sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <InputRightElement>
              <IconButton
                colorScheme="gray"
                variant="ghost"
                aria-label="Clear search text"
                icon={<Icon as={X} />}
                color="fg.muted"
                size="xs"
                onClick={toggle}
              />
            </InputRightElement>
          </InputGroup>
        </Box>
        <Divider />
        <Box p={2}>
          <Text color="fg.muted" fontSize="xs" fontWeight="medium" ml={1}>
            Documents
          </Text>
        </Box>
        <VStack mt={1} p={2}>
          {!hasResult && (
            <Flex pb={8} pt={4} justify="center" align="center" color="fg.muted">
              <Text>No results found.</Text>
            </Flex>
          )}
          {filteredDocuments?.map((document) => (
            <Flex
              as="button"
              className="transition-all ease-in-out duration-200"
              key={document._id}
              onClick={() => onSelect(document._id)}
              justify="start"
              align="center"
              w="full"
              p={2}
              py={1.5}
              rounded="4"
              _hover={{
                bg: "bg.subtle",
              }}
            >
              {document.icon ? (
                <Text mr={2} size="sm">
                  {document.icon}
                </Text>
              ) : (
                <Icon as={File} mr={2} h={4} w={4} />
              )}
              <Text as="span" fontSize="sm">
                {document.title}
              </Text>
            </Flex>
          ))}
        </VStack>
      </ModalContent>
    </Modal>
  );
};

export default SearchCommand;
