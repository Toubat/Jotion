"use client";

import { useSettings } from "@/hooks/use-settings";
import {
  Box,
  Flex,
  Text,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useColorMode,
  IconButton,
  Icon,
  useColorModeValue,
  Divider,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "lucide-react";
import { useIsMounted } from "usehooks-ts";

const SettingsModal = () => {
  const mounted = useIsMounted();
  const { toggleColorMode } = useColorMode();
  const ThemeIcon = useColorModeValue(SunIcon, MoonIcon);
  const { isOpen, onOpen, onClose } = useSettings((store) => store);

  if (!mounted) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay className="backdrop-blur-sm" />
      <ModalContent bg="bg.surface" border="1px" minW="700" borderColor="border.default">
        <ModalHeader>My settings</ModalHeader>
        <Divider />
        <ModalBody>
          <Flex align="center" justify="space-between" w="full" py={2} px={0}>
            <Box>
              <Text
                fontSize="lg"
                fontWeight="semibold"
                color="dark.900"
                _dark={{
                  color: "white",
                }}
              >
                Appearance
              </Text>
              <Text as="span" color="fg.muted" fontSize="sm">
                Customize how Jotion looks on your device
              </Text>
            </Box>
            <IconButton
              variant="secondary"
              aria-label="Toggle color mode"
              icon={<Icon as={ThemeIcon} />}
              onClick={toggleColorMode}
            />
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SettingsModal;
