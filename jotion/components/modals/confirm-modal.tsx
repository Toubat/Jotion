"use client";

import {
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
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent bg="bg.surface">
          <ModalHeader>Are you absolutely sure?</ModalHeader>
          <ModalBody>This action cannot be undone</ModalBody>
          <ModalFooter>
            <Button
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
              variant="secondary"
              mr={3}
              onClick={() => {
                onConfirm();
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
              }}
            >
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
