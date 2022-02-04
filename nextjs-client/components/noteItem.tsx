import { Stack, Text } from "@chakra-ui/react";
import React from "react";
import { Note } from "types";

type Props = {
  note: Note;
};

const NoteItem: React.FC<Props> = ({ note }) => {
  return (
    <Stack
      borderColor={"lightgrey"}
      border={"1px"}
      p={4}
      direction={"column"}
      mt={4}
      borderRadius={4}
      w={"100%"}
      spacing={4}
    >
      <Text fontSize={"xl"}>{note.title}</Text>
      <Text fontSize={"lg"}>{note.content}</Text>
      <Text fontSize={"xl"}> created At.{note.createdAt}</Text>
    </Stack>
  );
};

export default NoteItem;
