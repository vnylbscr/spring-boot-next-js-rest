import {
  Box,
  Container,
  Fade,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import MyInput from "@components/my-input";
import AppLayout from "@layouts/appLayout";
import axios from "axios";
import type { GetServerSidePropsContext, NextPage } from "next";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { dehydrate, QueryClient } from "react-query";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  if (!context.req.headers?.cookie?.includes("token")) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("user", () => {
    return axios.get("/api/user", {
      headers: {
        Authorization: context.req.headers.cookie || "",
      },
    });
  });

  return {
    props: {
      user: dehydrate(queryClient),
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

const Home = (props: any) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      title: "",
      text: "",
    },
  });
  const [focused, setFocused] = useState(false);

  const onSubmitForm = handleSubmit(async (data) => {
    console.log(data);
  });

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
          <Heading>Welcome, Mert</Heading>
          <Container p={16} maxW={"4xl"}>
            <Flex
              overflowY={"auto"}
              direction={"column"}
              justify={"center"}
              align="center"
            >
              <form onSubmit={onSubmitForm} style={{ width: "100%" }}>
                {
                  <Fade in={focused}>
                    <MyInput
                      control={control}
                      name={"title"}
                      renderStyleProps={{
                        width: "full",
                        height: "40px",
                        fontSize: 20,
                        placeholder: "Enter title",
                        variant: "flushed",
                      }}
                    />
                  </Fade>
                }

                <MyInput
                  control={control}
                  name={"text"}
                  renderStyleProps={{
                    width: "full",
                    height: "80px",
                    fontSize: 28,
                    placeholder: "What needs to be done?",
                    variant: "flushed",
                    onFocus: () => setFocused(true),
                    onBlur: () => {
                      console.log("onblur");
                    },
                  }}
                />
              </form>
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
