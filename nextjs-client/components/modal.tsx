import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  footer: React.ReactNode;
  body: React.ReactNode;
  title: string;
};

const MyModal = ({ title, isOpen, onClose, body, footer }: Props) => {
  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent>
        <Text as={ModalHeader}>{title}</Text>
        <ModalCloseButton />
        <ModalBody>{body}</ModalBody>
        <ModalFooter>{footer}</ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MyModal;
