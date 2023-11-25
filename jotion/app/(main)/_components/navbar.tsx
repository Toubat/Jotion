"use client";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Flex, HStack, Icon, IconButton, Skeleton } from "@chakra-ui/react";
import { useQuery } from "convex/react";
import { MenuIcon } from "lucide-react";
import { useParams } from "next/navigation";
import Title from "./title";
import Banner from "./banner";
import ActionMenu from "./action-menu";
import { Publish } from "./publish";

interface NavbarProps {
  isCollapsed: boolean;
  onResetWidth: () => void;
}

const Navbar = ({ isCollapsed, onResetWidth }: NavbarProps) => {
  const params = useParams();
  const document = useQuery(api.documents.getById, {
    documentId: params.documentId as Id<"documents">,
  });

  if (document === null) {
    return null;
  }

  return (
    <>
      <Flex bg="bg.surface" px={3} py={2} w="full" align="center" columnGap={2}>
        {isCollapsed && (
          <IconButton
            variant="tertiary"
            color="fg.muted"
            aria-label="Menu toggle"
            size="sm"
            icon={<Icon as={MenuIcon} />}
            onClick={onResetWidth}
          />
        )}
        <Flex align="center" w="full" justify="space-between">
          {document ? <Title initialData={document} /> : <Skeleton h={8} w={60} />}
          <HStack align="center">
            {document ? (
              <>
                <Publish initialData={document} />
                <ActionMenu documentId={document._id} />
              </>
            ) : (
              <Skeleton h={8} w={8} rounded="md" />
            )}
          </HStack>
        </Flex>
      </Flex>
      {document?.isArchived && <Banner documentId={document._id} />}
    </>
  );
};

export default Navbar;
