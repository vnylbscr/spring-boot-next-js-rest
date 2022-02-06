import {
  Box,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import InputArea from "@components/inputArea";
import AppLayout from "@layouts/appLayout";
import { END_POINT } from "@lib/constants";
import { useGetUserNotes } from "@services/user.service";
import axios from "axios";
import type { GetServerSidePropsContext } from "next";
import { useQuery } from "react-query";
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
  const { data } = useQuery("userPosts", () => {
    return axios
      .get(`${END_POINT}/note/user/${user.id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => res.data);
  });

  console.log("data user notes", data);

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
                  console.log("data is area", data);
                }}
              />
              {MOCK_DATA.map((item) => (
                <Stack
                  borderColor={"lightgrey"}
                  border={"1px"}
                  p={4}
                  direction={"column"}
                  mt={4}
                  borderRadius={4}
                  w={"100%"}
                  key={item.id}
                  spacing={4}
                >
                  <Text
                    fontWeight={"bold"}
                    textDecoration={"underline"}
                    fontSize={"xl"}
                  >
                    {item.name}
                  </Text>
                  <Text>{item.text}</Text>
                  <Text> created at: {item.createdAt}</Text>
                </Stack>
              ))}
            </Flex>
          </Container>
        </Flex>
      </Box>
    </AppLayout>
  );
};

export default Home;
