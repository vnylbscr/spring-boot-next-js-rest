/* eslint-disable react/no-unescaped-entities */
import { NoteIcon } from "@assets/icons";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import EditNoteDrawer from "@components/editNoteDrawer";
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
import React, { Fragment, useState } from "react";
import { useQueryClient } from "react-query";
import { Note, User } from "types";
import cookie from "cookie";
import AnimationPageLayout from "@layouts/animation-layout";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const cookies = cookie.parse(context.req.headers.cookie || "");

    console.log("ccokies", cookies);

    // server side auth
    if (cookies.isLoggedIn === "true" && cookies.token) {
      const res = await axios
        .get(`${END_POINT}/auth/verify`, {
          headers: {
            token: cookies.token,
          },
        })
        .then((res) => res.data);
      return {
        props: {
          user: res.data,
          token: cookies.token,
        },
      };
    }
    return {
      redirect: {
        destination: "/login",
        permanent: false,
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
  const [editedNote, setEditedNote] = useState<Note | undefined>(undefined);
  const { isOpen: isOpenModal, onToggle: onToggleModal } = useDisclosure();
  const { isOpen: isOpenDrawer, onToggle: onToggleDrawer } = useDisclosure();
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

  const {
    mutateAsync: updateNoteMutation,
    isLoading: isLoadingUpdateNote,
    error: updateNoteError,
  } = useTypeSafeMutation("updateNote", {
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

  console.log("rendered home");

  return (
    <AppLayout title={"Home"}>
      <AnimationPageLayout>
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
            <Heading fontSize={"xl"}>
              Today is{" "}
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}{" "}
              {"\n"}
              {new Date().toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </Heading>

            <Container p={4} maxW={"5xl"}>
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
                          description: `Note successfull added.`,
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
                <Box w={"full"} h={"full"} mt={4} px="1">
                  <Tabs
                    onChange={(index) => {
                      console.log("index is", index);
                    }}
                    variant="line"
                    colorScheme="blue"
                    isFitted={true}
                    py="4"
                  >
                    <TabList>
                      <Tab fontSize={"xl"}>All</Tab>
                      <Tab fontSize={"xl"}>Completed</Tab>
                    </TabList>
                    <TabPanels>
                      <TabPanel>
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
                                justify={"center"}
                                direction="column"
                                align="center"
                                h={"600px"}
                                gap="4"
                              >
                                <NoteIcon
                                  fill={"#FFD32D"}
                                  width={50}
                                  height={50}
                                />
                                <Text fontSize={"lg"}>
                                  You don't have any notes. You can add one by
                                  clicking on the add button.
                                </Text>
                              </Flex>
                            ) : (
                              <Box minHeight={"60vh"}>
                                {userNotes?.data?.map((item) => (
                                  <NoteItem
                                    key={item.id}
                                    onCompleted={(id) => {
                                      console.log("completed note id", id);
                                      completeNoteMutation([id, token])
                                        .then((res) => {
                                          console.log("completed note", res);
                                          toast({
                                            status: "success",
                                            description: `Good work 💪 Note completed successfully.`,
                                          });
                                        })
                                        .catch((err) => {
                                          console.log("error is", err);
                                          toast({
                                            status: "error",
                                            description: `Note can't completed.`,
                                          });
                                        });
                                    }}
                                    onDeleted={(id) => {
                                      setDeletedNote(id);
                                      onToggleModal();
                                    }}
                                    note={item}
                                    onEdited={(id) => {
                                      setEditedNote(
                                        userNotes.data.find(
                                          (note) => note.id === id
                                        )
                                      );
                                      onToggleDrawer();
                                    }}
                                  />
                                ))}
                              </Box>
                            )}
                          </Fragment>
                        )}
                      </TabPanel>
                    </TabPanels>
                  </Tabs>

                  {isOpenDrawer && (
                    <EditNoteDrawer
                      isOpen={isOpenDrawer}
                      onClose={onToggleDrawer}
                      onSubmit={(data) => {}}
                      note={editedNote}
                    />
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
      </AnimationPageLayout>
    </AppLayout>
  );
};

export default Home;
