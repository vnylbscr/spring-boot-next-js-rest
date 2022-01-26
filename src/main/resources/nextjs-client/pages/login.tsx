import {
  Button,
  Container,
  Flex,
  Heading,
  Link as ChakraLink,
  Stack,
} from "@chakra-ui/react";
import React, { Fragment } from "react";
import { useForm } from "react-hook-form";
import MyInput from "../components/input/my-input";
import LoginRegisterLayout from "../layouts/login-register-layout";
import { LoginState } from "../types";
import Link from "next/link";

const LoginPage = () => {
  const { control, handleSubmit } = useForm<LoginState>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmitForm = handleSubmit((data) => {
    console.log("data", data);
  });

  return (
    <LoginRegisterLayout>
      <Fragment>
        <Heading mb={4} fontSize={"3xl"} textAlign={"center"} color={"white"}>
          Login
        </Heading>

        <form onSubmit={onSubmitForm}>
          <Stack spacing={3}>
            <MyInput
              control={control}
              name={"username"}
              rules={{
                required: "This field is required",
              }}
              renderStyleProps={{
                placeholder: "Username or e-mail",
                variant: "flushed",
              }}
            />
            <MyInput
              control={control}
              name={"password"}
              rules={{
                required: "This field is required",
                minLength: {
                  value: 5,
                  message: "Your password must be at least 5 characters",
                },
              }}
              renderStyleProps={{
                placeholder: "Password",
                variant: "flushed",
                type: "password",
              }}
            />

            <Button type={"submit"} colorScheme={"teal"}>
              Login
            </Button>
            <Heading textAlign={"center"} fontSize={"sm"}>
              You don't have account?{" "}
              <Link href={"/register"}>
                <ChakraLink color={"teal"}>Register</ChakraLink>
              </Link>
            </Heading>
          </Stack>
        </form>
      </Fragment>
    </LoginRegisterLayout>
  );
};

export default LoginPage;
