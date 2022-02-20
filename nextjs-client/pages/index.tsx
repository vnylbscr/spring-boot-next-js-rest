import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  SkeletonCircle,
  SkeletonText,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import InputArea from "@components/inputArea";
import MyModal from "@components/modal";
import NoteItem from "@components/noteItem";
import AppLayout from "@layouts/appLayout";
import { END_POINT } from "@lib/constants";
import axios from "axios";
import { useTypeSafeMutation } from "hooks/useTypeSafeMutation";
import { useTypeSafeQuery } from "hooks/useTypeSafeQuery";
import type { GetServerSidePropsContext } from "next";
import { Fragment } from "react";
import { User } from "types";

export async function getServerSideProps(context: GetServerSidePropsContext) {
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

  console.log("res", res);

  return {
    props: {
      user: res.data,
      token: context.req.headers.cookie.split("token=")[1].split(";")[0],
    },
  };
}

const MOCK_DATA = [
  {
    id: "1",
    name: "John Doe",
    text: "Lorem ipsunasn djasn dkasdb kahsbd ahsbdj ahsbdjb asjhdb ajshdba ",
    createdAt: "2020-01-01",
  },
  {
    id: "2",
    name: "John Doe",
    text: "Lorem ipsunasn djasn dkasdb kahsbd ahsbdj ahsbdjb asjhdb ajshdba ",
    createdAt: "2020-01-01",
  },
  {
    id: "3",
    name: "John Doe",
    text: "Lorem ipsunasn djasn dkasdb kahsbd ahsbdj ahsbdjb asjhdb ajshdba ",
    createdAt: "2020-01-01",
  },
  {
    id: "4",
    name: "John Doe",
    text: "Lorem ipsunasn djasn dkasdb kahsbd ahsbdj ahsbdjb asjhdb ajshdba ",
    createdAt: "2020-01-01",
  },
];

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

  const { isOpen, onToggle } = useDisclosure();

  const {
    data: userNotes,
    isLoading: userNotesLoading,
    error,
  } = useTypeSafeQuery(
    ["getUserNotes"],
    {
      refetchOnMount: "always",
    },
    user.id,
    token
  );

  const {
    mutateAsync,
    isLoading,
    error: addNoteError,
  } = useTypeSafeMutation("addNote");

  if (error) {
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
                  mutateAsync([
                    {
                      ...data,
                      userId: user.id,
                    },
                    token,
                  ])
                    .then(({ data }) => {
                      toast({
                        status: "success",
                        description: `Note ${data?.title} successfull added.`,
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
                isLoading={isLoading}
              />
              <Box w={"full"} h={"full"} mt={4}>
                <Heading textAlign={"center"}>Latest Notes</Heading>
                {userNotesLoading && (
                  <Box
                    padding="6"
                    boxShadow="lg"
                    bg="transparent"
                    width={"full"}
                  >
                    {[1, 2, 3].map((item, index) => {
                      return (
                        <Box
                          key={index}
                          padding="6"
                          boxShadow="lg"
                          bg="transparent"
                        >
                          <SkeletonCircle size="10" />
                          <SkeletonText mt="4" noOfLines={4} spacing="4" />
                        </Box>
                      );
                    })}
                  </Box>
                )}

                {userNotes?.data?.map((item) => (
                  <NoteItem
                    onCompleted={(id) => {
                      console.log("completed note id", id);
                    }}
                    onDeleted={(id) => {
                      console.log("deleted note id", id);
                      onToggle();
                    }}
                    key={item.id}
                    note={item}
                  />
                ))}

                <MyModal
                  isOpen={isOpen}
                  onClose={onToggle}
                  body={
                    <Box>
                      <Heading fontSize={"xl"}>
                        Are you sure you want to delete this note?
                      </Heading>
                    </Box>
                  }
                  footer={
                    <Flex gap={5} direction={"row"}>
                      <Button colorScheme={"red"} isFullWidth>
                        Confirm
                      </Button>
                      <Button
                        colorScheme={"gray"}
                        isFullWidth
                        onClick={onToggle}
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
