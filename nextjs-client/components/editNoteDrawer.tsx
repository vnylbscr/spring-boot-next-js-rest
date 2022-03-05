import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { Note } from "types";
import MyInput from "./my-input";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: IState) => void;
  note?: Note;
}

interface IState {
  text: string;
  title: string;
  id: string;
}

const EditNoteDrawer: React.FC<Props> = ({
  isOpen,
  onClose,
  onSubmit,
  note,
}) => {
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      title: note?.title ?? "",
      text: note?.text ?? "",
    },
  });

  const handleOnSubmit = handleSubmit((data) => {
    onSubmit({
      ...data,
      id: note?.id ?? "",
    });
  });

  console.log("note text", note?.text);

  return (
    <Drawer placement={"bottom"} onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <form onSubmit={handleOnSubmit}>
          <DrawerHeader borderBottomWidth="1px">Edit Note</DrawerHeader>
          <DrawerBody h={"full"}>
            <Stack
              h={"full"}
              spacing="5"
              justify={"space-between"}
              direction={"column"}
            >
              <MyInput
                control={control}
                name={"title"}
                renderStyleProps={{
                  height: "40px",
                  width: "full",
                  placeholder: "Enter title",
                  variant: "flushed",
                }}
              />
              <MyInput
                control={control}
                name={"text"}
                renderStyleProps={{
                  height: "40px",
                  placeholder: "Enter note text",
                  width: "full",
                  variant: "flushed",
                }}
              />
            </Stack>
          </DrawerBody>
          <DrawerFooter borderBottomWidth={"1px"}>
            <Stack spacing={2} direction="row">
              <Button colorScheme={"red"} onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" colorScheme={"teal"}>
                Save
              </Button>
            </Stack>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

export default EditNoteDrawer;
