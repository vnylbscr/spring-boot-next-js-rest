import { CheckIcon, DeleteIcon } from "@assets/icons";
import {
  Button,
  Collapse,
  Flex,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { Note } from "types";

type Props = {
  note: Note;
  onDeleted: (id: string) => void;
  onCompleted: (id: string) => void;
};

const NoteItem: React.FC<Props> = ({ note, onCompleted, onDeleted }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const iconSettings = {
    width: 20,
    height: 20,
  };

  const dateOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };

  return (
    <Stack
      borderColor={"#aaa"}
      border={"1px"}
      p={4}
      direction={"column"}
      my={4}
      borderRadius={4}
      w={"100%"}
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
      position="relative"
      maxHeight={"100%"}
      style={{
        transition: "all .2s ease-in-out",
      }}
    >
      <Flex justify={"space-between"}>
        <Text
          isTruncated={isOpen ? false : true}
          fontWeight={"bold"}
          fontSize={"lg"}
          textDecoration={note.completed ? "line-through" : "none"}
        >
          {note?.title || "Untitled"}
        </Text>
        <Text fontSize={"sm"} color="gray.500">
          {new Date(note.createdAt).toLocaleDateString("en-US", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "2-digit",
          })}
        </Text>
      </Flex>

      <Text
        textDecoration={note.completed ? "line-through" : "none"}
        noOfLines={isOpen ? undefined : 3}
        fontSize={"md"}
      >
        {note.text}
      </Text>

      <Collapse in={isOpen} startingHeight={0}>
        <Flex
          gap={"12px"}
          flexDirection={"row"}
          justifyContent={"space-between"}
          mt="4"
        >
          {!note.completed && (
            <Button
              onClick={() => {
                onCompleted(note.id);
              }}
              leftIcon={<CheckIcon {...iconSettings} />}
              isFullWidth={true}
              colorScheme={"teal"}
              variant="outline"
            >
              Complete
            </Button>
          )}

          <Button
            onClick={() => {
              onDeleted(note.id);
            }}
            isFullWidth={true}
            colorScheme={"red"}
            variant="outline"
            leftIcon={<DeleteIcon {...iconSettings} />}
          >
            Delete
          </Button>
        </Flex>
      </Collapse>
    </Stack>
  );
};

export default NoteItem;
