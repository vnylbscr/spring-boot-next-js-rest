/* eslint-disable react/no-unescaped-entities */
import { NoteIcon } from "@assets/icons";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import InputArea from "@components/inputArea";
import MyModal from "@components/modal";
import NoteItem from "@components/noteItem";
import SkeletonNote from "@components/skeleton";
import AppLayout from "@layouts/appLayout";
import { END_POINT } from "@lib/constants";
import axios from "axios";
import { useTypeSafeMutation } from "hooks/useTypeSafeMutation";
import { useTypeSafeQuery } from "hooks/useTypeSafeQuery";
import type { GetServerSidePropsContext } from "next";
import { Fragment, useState } from "react";
import { useQueryClient } from "react-query";
import { User } from "types";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    // server side auth
    if (!context.req.headers?.cookie?.includes("token")) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
    const res = await axios
      .get(`${END_POINT}/auth/verify`, {
        headers: {
          token: context.req.headers.cookie.split("token=")[1].split(";")[0],
        },
      })
      .then((res) => res.data);

    return {
      props: {
        user: res.data,
        token: context.req.headers.cookie.split("token=")[1].split(";")[0],
      },
    };
  } catch (error: any) {
    if (error.response.status === 401) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
  }
}

interface IProps {
  user: User;
  token: string;
}

const Home: React.FC<IProps> = ({ token, user, children }) => {
  const toast = useToast({
    position: "bottom-right",
    isClosable: true,
    variant: "solid",
  });
  const [deletedNote, setDeletedNote] = useState<string>("");
  const { isOpen: isOpenModal, onToggle: onToggleModal } = useDisclosure();
  const queryClient = useQueryClient();

  const {
    data: userNotes,
    isLoading: userNotesLoading,
    error,
  } = useTypeSafeQuery(["getUserNotes"], {}, user.id, token);

  const {
    mutateAsync: addNoteMutation,
    isLoading: addNoteLoading,
    error: addNoteError,
  } = useTypeSafeMutation("addNote", {
    onSuccess: ({ data: response }) => {
      const cachedData: typeof userNotes =
        queryClient.getQueryData("getUserNotes");

      if (cachedData?.data) {
        queryClient.setQueryData("getUserNotes", {
          data: [response, ...cachedData.data],
        });
      }
    },
  });

  const {
    mutateAsync: deleteNoteMutation,
    isLoading: isLoadingDeleteNote,
    error: deleteNoteError,
  } = useTypeSafeMutation("deleteNote", {
    onSuccess: ({ data: response }) => {
      const cachedData: typeof userNotes =
        queryClient.getQueryData("getUserNotes");

      if (cachedData?.data) {
        const newData = cachedData.data.filter(
          (note) => note.id !== deletedNote
        );
        queryClient.setQueryData("getUserNotes", { data: newData });
      }
    },
  });

  const {
    mutateAsync: completeNoteMutation,
    isLoading: isLoadingCompleteNote,
    error: completeNoteError,
  } = useTypeSafeMutation("completeNote", {
    onSuccess: ({ data: response }) => {
      const cachedData: typeof userNotes =
        queryClient.getQueryData("getUserNotes");

      if (cachedData?.data) {
        const newData = cachedData.data.map((note) =>
          note.id === response.id ? response : note
        );
        queryClient.setQueryData("getUserNotes", { data: newData });
      }
    },
  });

  const isError = Boolean(
    error || addNoteError || completeNoteError || deleteNoteError
  );

  if (isError) {
    toast({
      status: "error",
      description: "An error occured",
    });
  }

  return (
    <AppLayout title={"Home"}>
      <Box>
        <Flex
          justify={"center"}
          align={"center"}
          bgColor={useColorModeValue("gray.50", "gray.900")}
          p={"4"}
          direction={"column"}
          h={"full"}
        >
          <Heading>Welcome, {user.username} </Heading>
          <Container p={4} maxW={"4xl"}>
            <Flex
              overflowY={"auto"}
              direction={"column"}
              justify={"center"}
              align="center"
            >
              <InputArea
                onSubmit={(data) => {
                  addNoteMutation([
                    {
                      ...data,
                      userId: user.id,
                    },
                    token,
                  ])
                    .then(({ data }) => {
                      toast({
                        status: "success",
                        description: `Note ${data?.title.substring(
                          0,
                          20
                        )} successfull added.`,
                      });
                    })
                    .catch((err) => {
                      console.log("error is", err);
                      toast({
                        status: "error",
                        description: `Note can't added.`,
                      });
                    });
                }}
                isLoading={addNoteLoading}
              />
              <Box w={"full"} h={"full"} mt={4}>
                <Heading textAlign={"center"}>Latest Notes</Heading>
                {userNotesLoading ? (
                  <Box
                    padding="6"
                    boxShadow="lg"
                    bg="transparent"
                    width={"full"}
                  >
                    {[1, 2, 3].map((item, index) => {
                      return <SkeletonNote key={index} />;
                    })}
                  </Box>
                ) : (
                  <Fragment>
                    {userNotes?.data?.length === 0 ? (
                      <Flex
                        justify={"flex-start"}
                        direction="column"
                        align="center"
                        h={"600px"}
                        gap="4"
                      >
                        <NoteIcon fill={"#FFD32D"} width={50} height={50} />
                        <Text fontSize={"lg"}>
                          You don't have any notes. Please add a new note by
                          clicking the button above.
                        </Text>
                      </Flex>
                    ) : (
                      userNotes?.data?.map((item) => (
                        <NoteItem
                          onCompleted={(id) => {
                            console.log("completed note id", id);
                            completeNoteMutation([id, token])
                              .then((res) => {
                                console.log("completed note", res);
                                toast({
                                  status: "success",
                                  description: `Note completed successfully.`,
                                });
                              })
                              .catch((err) => {
                                console.log("error is", err);
                              });
                          }}
                          onDeleted={(id) => {
                            setDeletedNote(id);
                            onToggleModal();
                          }}
                          key={item.id}
                          note={item}
                        />
                      ))
                    )}
                  </Fragment>
                )}

                <MyModal
                  isOpen={isOpenModal}
                  onClose={onToggleModal}
                  body={
                    <Box>
                      <Heading fontSize={"xl"}>
                        Are you sure you want to delete this note?
                      </Heading>
                    </Box>
                  }
                  footer={
                    <Flex gap={5} direction={"row"}>
                      <Button
                        onClick={() => {
                          deleteNoteMutation([deletedNote, token])
                            .then((res) => {
                              toast({
                                status: "success",
                                description: `Note deleted successfully.`,
                              });
                              onToggleModal();
                            })
                            .catch((err) => {
                              toast({
                                status: "error",
                                description: `Note can't deleted.`,
                              });
                              onToggleModal();
                            });
                        }}
                        colorScheme={"red"}
                        isFullWidth
                      >
                        Confirm
                      </Button>
                      <Button
                        colorScheme={"gray"}
                        isFullWidth
                        onClick={onToggleModal}
                      >
                        Cancel
                      </Button>
                    </Flex>
                  }
                  title="Confirm delete"
                />
              </Box>
            </Flex>
          </Container>
        </Flex>
      </Box>
    </AppLayout>
  );
};

export default Home;
