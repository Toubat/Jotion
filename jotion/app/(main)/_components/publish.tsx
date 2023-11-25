"use client";

import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import useOrigin from "@/hooks/use-origin";
import {
  Button,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputRightAddon,
  InputRightElement,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useMutation } from "convex/react";
import { Check, Copy, Globe } from "lucide-react";
import { useState } from "react";

export const Publish: React.FC<{
  initialData: Doc<"documents">;
}> = ({ initialData }) => {
  const origin = useOrigin();
  const toast = useToast();
  const update = useMutation(api.documents.update);
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const url = `${origin}/preview/${initialData._id}`;

  const onPublish = () => {
    setIsSubmitting(true);

    const prmose = update({
      id: initialData._id,
      isPublished: true,
    }).finally(() => {
      setIsSubmitting(false);
    });

    toast.promise(prmose, {
      loading: {
        title: "Publishing...",
        description: "Your document is being published.",
      },
      success: {
        title: "Published",
        description: "Your document is now published.",
      },
      error: {
        title: "Error",
        description: "Your document could not be published.",
      },
    });
  };

  const onUnPublish = () => {
    setIsSubmitting(true);

    const prmose = update({
      id: initialData._id,
      isPublished: false,
    }).finally(() => {
      setIsSubmitting(false);
    });

    toast.promise(prmose, {
      loading: {
        title: "Unpublishing...",
        description: "Your document is being unpublished.",
      },
      success: {
        title: "Unpublished",
        description: "Your document is now unpublished.",
      },
      error: {
        title: "Error",
        description: "Your document could not be unpublished.",
      },
    });
  };

  const onCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <Popover placement="bottom-end">
      <PopoverTrigger>
        <Button variant="tertiary" size="sm">
          Publish{" "}
          {initialData.isPublished && <Icon as={Globe} color="blue.400" w={4} h={4} ml={2} />}
        </Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent bg="bg.surface" display="flex" alignItems="center" p={4} w="25rem">
          {initialData.isPublished ? (
            <VStack spacing={4} align="start" w="full">
              <Flex align="center" columnGap={2}>
                <Icon className="animate-pulse" as={Globe} w={4} h={4} color="blue.400" />
                <Text fontSize="xs" fontWeight="medium" color="blue.400">
                  This note is live on web.
                </Text>
              </Flex>
              <InputGroup size="sm">
                <Input variant="filled" pr="4.5rem" isTruncated value={url} disabled />
                <InputRightElement width="3.75rem" h="full" p={0} m={0}>
                  <Button h="1.5rem" onClick={onCopy} disabled={copied} rounded="sm">
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <Button
                w="full"
                size="sm"
                variant="inverted"
                disabled={isSubmitting}
                onClick={onUnPublish}
              >
                Unpublish
              </Button>
            </VStack>
          ) : (
            <Flex flexDir="column" align="center" justify="center">
              <Icon as={Globe} color="fg.muted" w={8} h={8} mb={2} />
              <Text mb={2} fontWeight="medium" size="sm">
                Publish this note
              </Text>
              <Text size="xs" color="fg.muted" mb={4}>
                Share your work with others
              </Text>
              <Button
                variant="inverted"
                w="full"
                fontSize="xs"
                size="sm"
                disabled={isSubmitting}
                onClick={onPublish}
              >
                Publish
              </Button>
            </Flex>
          )}
        </PopoverContent>
      </Portal>
    </Popover>
  );
};
