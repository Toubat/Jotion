"use client";
import { useCoverImage } from "@/hooks/use-cover-image";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useIsMounted } from "usehooks-ts";
import { SingleImageDropzone } from "../single-image-dropzone";
import { useState } from "react";
import { useEdgeStore } from "@/libs/edgestore";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";

const CoverImageModal = () => {
  const params = useParams();
  const mounted = useIsMounted();
  const coverImage = useCoverImage();
  const { edgestore } = useEdgeStore();
  const update = useMutation(api.documents.update);

  const [file, setFile] = useState<File>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onClose = () => {
    setFile(undefined);
    setIsSubmitting(false);
    coverImage.onClose();
  };

  const onChange = async (file?: File) => {
    if (file) {
      setIsSubmitting(true);
      setFile(file);

      const options = coverImage.url ? { replaceTargetUrl: coverImage.url } : {};
      const res = await edgestore.publicFiles.upload({ file, options });

      await update({
        id: params.documentId as Id<"documents">,
        coverImage: res.url,
      });

      onClose();
    }
  };

  if (!mounted) return null;

  return (
    <Modal isOpen={coverImage.isOpen} onClose={coverImage.onClose} isCentered>
      <ModalOverlay className="backdrop-blur-sm" />
      <ModalContent bg="bg.surface" border="1px" minW="700" borderColor="border.default">
        <ModalHeader mx="auto">Cover Image</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <SingleImageDropzone
            className="w-full outline-none"
            disabled={isSubmitting}
            value={file}
            onChange={onChange}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CoverImageModal;
