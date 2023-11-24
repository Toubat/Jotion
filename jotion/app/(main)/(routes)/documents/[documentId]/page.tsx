"use client";
import { useQuery } from "convex/react";
import { Box, Flex } from "@chakra-ui/react";
import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import Toolbar from "@/components/toolbar";

interface DocumentIdPageProps {
  params: {
    documentId: Id<"documents">;
  };
}

const DocumentIdPage = ({ params }: DocumentIdPageProps) => {
  const document = useQuery(api.documents.getById, {
    documentId: params.documentId,
  });

  if (document === undefined) {
    return <p>Loading...</p>;
  }

  if (document === null) {
    return <p>Not found</p>;
  }

  return (
    <Box>
      <Box h={12} />
      <Flex mx="auto" w="full">
        <Toolbar initialData={document} />
      </Flex>
    </Box>
  );
};

export default DocumentIdPage;
