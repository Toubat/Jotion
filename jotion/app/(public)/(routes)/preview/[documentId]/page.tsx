"use client";
import { useMutation, useQuery } from "convex/react";
import { Box, Flex, Skeleton, VStack } from "@chakra-ui/react";
import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import Toolbar from "@/components/toolbar";
import Cover from "@/components/cover";
import { useMemo } from "react";
import dynamic from "next/dynamic";

interface PreviewPageProps {
  params: {
    documentId: Id<"documents">;
  };
}

const PreviewPage = ({ params }: PreviewPageProps) => {
  const Editor = useMemo(() => dynamic(() => import("@/components/editor"), { ssr: false }), []);
  const document = useQuery(api.documents.getById, {
    documentId: params.documentId,
  });
  const update = useMutation(api.documents.update);

  const onChange = (content: string) => {
    update({
      id: params.documentId,
      content,
    });
  };

  if (document === undefined) {
    return (
      <Box>
        <Skeleton h="30vh" w="full" m={3} />
        <Flex mx="auto" w="full" mt={8}>
          <VStack px={10} spacing={4} w="full" align="start">
            <Skeleton h={14} className="w-[50%]" />
            <Skeleton h={4} className="w-[80%]" />
            <Skeleton h={4} className="w-[40%]" />
            <Skeleton h={4} className="w-[60%]" />
          </VStack>
        </Flex>
      </Box>
    );
  }

  if (document === null) {
    return <p>Not found</p>;
  }

  return (
    <Box bg="bg.surface">
      <Cover preview url={document.coverImage} />
      <Flex mx="auto" w="6xl" flexDir="column">
        <Toolbar preview initialData={document} />
        <Editor editable={false} onChange={onChange} initialContent={document.content} />
      </Flex>
    </Box>
  );
};

export default PreviewPage;
