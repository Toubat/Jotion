"use client";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { on } from "events";
import { useRef } from "react";

interface ConfirmModalProps {
  children: React.ReactNode;
  onConfirm: () => void;
  onModalOpen?: () => void;
  onModalClose?: () => void;
}

export const ConfirmModal = ({
  children,
  onConfirm,
  onModalOpen,
  onModalClose,
}: ConfirmModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Box
        onClick={(e) => {
          e.stopPropagation();
          onModalOpen?.();
          onOpen();
        }}
      >
        {children}
      </Box>
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={() => {}} isCentered>
        <AlertDialogOverlay>
          <AlertDialogContent bg="bg.surface">
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Are you absolutely sure?
            </AlertDialogHeader>
            <AlertDialogBody>This action cannot be undone.</AlertDialogBody>
            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                size="sm"
                variant="secondary"
                mr={3}
                onClick={() => {
                  onModalClose?.();
                  onClose();
                }}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                variant="inverted"
                onClick={() => {
                  onConfirm();
                  onModalClose?.();
                  onClose();
                }}
              >
                Confirm
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
