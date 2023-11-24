"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useCoverImage } from "@/hooks/use-cover-image";
import { Button, Flex } from "@chakra-ui/react";
import { useMutation } from "convex/react";
import { ImageIcon, X } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEdgeStore } from "@/libs/edgestore";

const Cover: React.FC<{
  url?: string;
  preview?: boolean;
}> = ({ url, preview }) => {
  const params = useParams();
  const coverImage = useCoverImage();
  const { edgestore } = useEdgeStore();
  const removeCoverImage = useMutation(api.documents.removeCoverImage);

  const onRemove = async () => {
    if (url) {
      await edgestore.publicFiles.delete({
        url: url,
      });
    }
    await removeCoverImage({ id: params.documentId as Id<"documents"> });
  };

  return (
    <Flex className="group" pos="relative" w="full" h={url ? "30vh" : "12vh"}>
      {!!url && <Image src={url} fill alt="Cover" className="object-cover" />}
      {!!url && !preview && (
        <Flex
          className="opacity-0 group-hover:opacity-100 absolute transition-all ease-in-out duration-300"
          bottom={5}
          right={5}
          align="center"
          columnGap={2}
        >
          <Button
            bg="bg.surface"
            color="fg.default"
            size="sm"
            onClick={() => coverImage.onReplace(url)}
            _hover={{
              bg: "bg.subtle",
            }}
            shadow="md"
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Change cover
          </Button>
          <Button
            bg="bg.surface"
            color="fg.default"
            size="sm"
            onClick={onRemove}
            _hover={{
              bg: "bg.subtle",
            }}
            shadow="md"
          >
            <X className="h-4 w-4 mr-2" />
            Remove
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

export default Cover;
