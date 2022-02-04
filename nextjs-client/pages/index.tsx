import {
  Box,
  Collapse,
  Container,
  Fade,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
  useOutsideClick,
} from "@chakra-ui/react";
import MyInput from "@components/my-input";
import AppLayout from "@layouts/appLayout";
import customRequest from "@services/request";
import axios from "axios";
import type { GetServerSidePropsContext } from "next";
import { useRef, useState } from "react";
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

  const data = axios
    .get("/auth/verify", {
      headers: {
        token: context.req.headers.cookie.split("token=")[1].split(";")[0],
      },
    })
    .then((res) => res.data);

  return {
    props: {
      token: context.req.headers?.cookie?.split("token=")[1],
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

  const inputRef = useRef<HTMLInputElement>(null);

  useOutsideClick({
    ref: inputRef,
    handler: () => setFocused(false),
  });

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
          <Container p={4} maxW={"4xl"}>
            <Flex
              overflowY={"auto"}
              direction={"column"}
              justify={"center"}
              align="center"
            >
              <div ref={inputRef} style={{ width: "100%" }}>
                <form onSubmit={onSubmitForm} style={{ width: "100%" }}>
                  {
                    <Collapse in={focused} animateOpacity={true}>
                      <MyInput
                        control={control}
                        name={"title"}
                        renderStyleProps={{
                          width: "full",
                          height: "40px",
                          fontSize: 20,
                          placeholder: "Enter title",
                          variant: "flushed",
                          onFocus: () => setFocused(true),
                        }}
                      />
                    </Collapse>
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
                    }}
                  />
                </form>
              </div>
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
