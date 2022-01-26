import { Button, Heading, Stack, Link as ChakraLink } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import MyInput from "../components/input/my-input";
import LoginRegisterLayout from "../layouts/login-register-layout";
import { RegisterState } from "../types";

const RegisterPage = () => {
  const { control, handleSubmit, watch } = useForm<RegisterState>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const onSubmitForm = handleSubmit((data) => {
    console.log("data ", data);
  });

  return (
    <LoginRegisterLayout>
      <Heading mb={4} textAlign={"center"} color={"white"}>
        Register
      </Heading>
      <form onSubmit={onSubmitForm}>
        <Stack spacing={3}>
          <MyInput
            control={control}
            name={"email"}
            rules={{
              required: "This field is required",
              pattern: {
                message: "Please provide a valid email.",
                value:
                  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
              },
            }}
            renderStyleProps={{
              placeholder: "E-mail",
              variant: "flushed",
            }}
          />
          <MyInput
            control={control}
            name={"username"}
            rules={{
              required: "This field is required",
              minLength: {
                value: 5,
                message: "Your name must be at least 5 characters",
              },
            }}
            renderStyleProps={{
              placeholder: "Username",
              variant: "flushed",
            }}
          />
          <MyInput
            control={control}
            name={"password"}
            rules={{
              required: "This field is required",
            }}
            renderStyleProps={{
              placeholder: "Password",
              variant: "flushed",
              type: "password",
            }}
          />
          <MyInput
            control={control}
            name={"passwordConfirm"}
            rules={{
              required: "This field is required",
              validate: (value) => {
                return (
                  value === watch("password") || "Does not match passwords"
                );
              },
            }}
            renderStyleProps={{
              placeholder: "Password confirm",
              variant: "flushed",
              type: "password",
            }}
          />

          <Button type={"submit"} colorScheme={"teal"}>
            Register
          </Button>
          <Heading textAlign={"center"} fontSize={"sm"}>
            You already have an account?{" "}
            <Link href={"/login"}>
              <ChakraLink color={"teal"}>Register</ChakraLink>
            </Link>
          </Heading>
        </Stack>
      </form>
    </LoginRegisterLayout>
  );
};

export default RegisterPage;
