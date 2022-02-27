import { CheckIcon, DeleteIcon, EditIcon } from "@assets/icons";
import {
  Button,
  Collapse,
  Fade,
  Flex,
  IconButton,
  Stack,
  Text,
  Tooltip,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useCallback } from "react";
import TimeAgo from "timeago-react";
import { Note } from "types";

type NoteFunc = (id: string) => void;

type Props = {
  note: Note;
  onDeleted: NoteFunc;
  onCompleted: NoteFunc;
  onEdited: NoteFunc;
};

const NoteItem: React.FC<Props> = ({
  note,
  onCompleted,
  onDeleted,
  onEdited,
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const iconSettings = {
    width: 20,
    height: 20,
  };

  const handleOnDelete = useCallback(() => {
    onDeleted(note.id);
  }, [note.id, onDeleted]);

  const handleOnEdit = useCallback(() => {
    onEdited(note.id);
  }, [note.id, onEdited]);

  const handleOnComplete = useCallback(() => {
    onCompleted(note.id);
  }, [note.id, onCompleted]);

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
      <Flex align={"center"} gap={isOpen ? "10px" : undefined}>
        <Flex align={"center"} width={"100%"} justify="space-between">
          <Text
            isTruncated={isOpen ? false : true}
            fontWeight={"bold"}
            fontSize={"lg"}
            textDecoration={note.completed ? "line-through" : "none"}
          >
            {note?.title || "Untitled Note"}
          </Text>
          <Tooltip
            placement={"top"}
            label={new Date(note.createdAt).toLocaleDateString()}
            openDelay={500}
          >
            <Text fontSize={"sm"} colorScheme="gray">
              <TimeAgo datetime={note.createdAt} locale="en" />
            </Text>
          </Tooltip>
        </Flex>
        <Collapse in={isOpen}>
          <Tooltip
            openDelay={500}
            placement={"top"}
            colorScheme="cyan"
            label={"Edit"}
          >
            <IconButton
              icon={<EditIcon width={15} height={15} />}
              aria-label="Edit"
              size={"xs"}
              colorScheme="teal"
              onClick={handleOnEdit}
            />
          </Tooltip>
        </Collapse>
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
              onClick={handleOnComplete}
              leftIcon={<CheckIcon {...iconSettings} />}
              isFullWidth={true}
              colorScheme={"teal"}
            >
              Complete
            </Button>
          )}

          <Button
            onClick={handleOnDelete}
            isFullWidth={true}
            colorScheme={"red"}
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
