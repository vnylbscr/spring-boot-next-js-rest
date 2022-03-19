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
  useToast,
} from "@chakra-ui/react";
import EditNoteDrawer from "@components/editNoteDrawer";
import InputArea from "@components/inputArea";
import MyModal from "@components/modal";
import NoteItem from "@components/noteItem";
import SkeletonNote from "@components/skeleton";
import WelcomeSection from "@components/welcomeSection";
import AnimationPageLayout from "@layouts/animation-layout";
import AppLayout from "@layouts/appLayout";
import { END_POINT } from "@lib/constants";
import axios from "axios";
import cookie from "cookie";
import useStore from "global-store/useStore";
import { useTypeSafeMutation } from "hooks/useTypeSafeMutation";
import { useTypeSafeQuery } from "hooks/useTypeSafeQuery";
import type { GetServerSidePropsContext } from "next";
import React, { Fragment, useEffect, useRef } from "react";
import { useQueryClient } from "react-query";
import { User } from "types";

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

const Home: React.FC<IProps> = ({ token, user }) => {
  const toast = useToast({
    position: "bottom-right",
    isClosable: true,
    variant: "solid",
  });
  const store = useStore();

  const bodyRef = useRef<HTMLDivElement | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    store.setToken(token);
    store.setUser(user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const {
    data: userNotes,
    isLoading: userNotesLoading,
    error,
  } = useTypeSafeQuery(
    ["getUserNotes"],
    {
      keepPreviousData: true,
    },
    {
      userId: user.id,
      token,
      completed: false,
      page: 0,
      size: 10,
    }
  );

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
          ...cachedData,
          data: {
            ...cachedData.data,
            items: [response, ...cachedData.data.items],
          },
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

      if (cachedData?.data?.items) {
        const newData = cachedData.data.items.filter(
          (note) => note.id !== store.deletedNote
        );
        queryClient.setQueryData("getUserNotes", {
          ...cachedData,
          data: {
            ...cachedData.data,
            items: newData,
          },
        });
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
        const newData = cachedData.data.items.map((note) =>
          note.id === response.id ? response : note
        );
        queryClient.setQueryData("getUserNotes", {
          ...cachedData,
          data: {
            ...cachedData.data,
            items: newData,
          },
        });
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
        const newData = cachedData.data.items.map((note) =>
          note.id === response.id ? response : note
        );

        queryClient.setQueryData("getUserNotes", {
          ...cachedData,
          data: {
            ...cachedData.data,
            items: newData,
          },
        });
      }
    },
  });

  const isError = Boolean(
    error || addNoteError || completeNoteError || deleteNoteError
  );

  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    // set paging
    if (scrollTop + clientHeight === scrollHeight) {
      console.log("scrolled to bottom");
    }

    // set scroll position
    if (bodyRef.current) {
      bodyRef.current.scrollTop = scrollTop;
    }
  };

  if (isError) {
    toast({
      status: "error",
      description: "An error occured",
    });
  }

  return (
    <AppLayout title={"Home"}>
      <AnimationPageLayout>
        <Box onScroll={handleScroll} ref={bodyRef}>
          <Flex
            justify={"center"}
            align={"center"}
            bgColor={useColorModeValue("gray.50", "gray.900")}
            p={"4"}
            direction={"column"}
            h={"full"}
          >
            <WelcomeSection username={user.username} />
            <Container maxW={"6xl"}>
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
                <Box w={"full"} h={"full"} mt={1} px="1">
                  <Tabs
                    onChange={(index) => {
                      console.log("index is", index);
                    }}
                    variant="solid-rounded"
                    colorScheme="teal"
                    isFitted={true}
                    py="4"
                    defaultIndex={0}
                  >
                    <TabList>
                      <Tab
                        onClick={() => {
                          store.setActiveTab("active");
                        }}
                        tabIndex={0}
                        fontSize={"xl"}
                      >
                        Todo
                      </Tab>
                      <Tab
                        onClick={() => {
                          store.setActiveTab("completed");
                        }}
                        tabIndex={1}
                        fontSize={"xl"}
                      >
                        Completed
                      </Tab>
                    </TabList>
                    <TabPanels>
                      <TabPanel id={"tab-panel-active"} p={"0"}>
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
                            {userNotes?.data?.items?.length === 0 ? (
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
                                {userNotes?.data?.items?.map((item) => (
                                  <NoteItem
                                    key={item.id}
                                    onCompleted={(id) => {
                                      console.log("completed note id", id);
                                      completeNoteMutation([id, token])
                                        .then((res) => {
                                          console.log("completed note", res);
                                          toast({
                                            status: "success",
                                            description: `Good job 💪 Note completed successfully.`,
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
                                      store.setDeletedNote(id);
                                      store.setIsOpenModal(true);
                                    }}
                                    note={item}
                                    onEdited={(id) => {
                                      const foundNote =
                                        userNotes.data.items.find?.(
                                          (item) => item.id === id
                                        );
                                      if (foundNote) {
                                        store.setEditedNote(foundNote);
                                      } else {
                                        console.log("note not found");
                                        store.setEditedNote(null);
                                      }
                                      store.setIsDrawerOpen(true);
                                    }}
                                    isOpen={store.selectedNote?.id === item.id}
                                  />
                                ))}
                              </Box>
                            )}
                          </Fragment>
                        )}
                      </TabPanel>

                      {/* COMPLETED */}
                      <TabPanel tabIndex={1}>
                        <Text>Merto lala completed tab index 1</Text>
                      </TabPanel>
                    </TabPanels>
                  </Tabs>

                  <EditNoteDrawer
                    onSubmit={(data) => {
                      console.log("edit note drawer mutation", data);
                    }}
                  />

                  <MyModal
                    isOpen={store.isOpenModal}
                    onClose={() => {
                      store.setIsOpenModal(false);
                    }}
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
                            deleteNoteMutation([store.deletedNote, token])
                              .then((res) => {
                                toast({
                                  status: "success",
                                  description: `Note deleted successfully.`,
                                });
                                store.setIsOpenModal(false);
                              })
                              .catch((err) => {
                                toast({
                                  status: "error",
                                  description: `Note can't deleted.`,
                                });
                                store.setIsOpenModal(false);
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
                          onClick={() => {
                            store.setIsOpenModal(false);
                            store.setIsDrawerOpen(false);
                          }}
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
