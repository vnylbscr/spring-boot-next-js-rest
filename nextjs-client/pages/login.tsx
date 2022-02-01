import {
  Alert,
  AlertIcon,
  Button,
  Heading,
  Link as ChakraLink,
  Stack,
} from "@chakra-ui/react";
import MyInput from "@components/my-input";
import LoginRegisterLayout from "@layouts/login-register-layout";
import { REGEX } from "@lib/constants";
import { useLoginMutation } from "@services/user.service";
import Link from "next/link";
import React, { Fragment } from "react";
import { useForm } from "react-hook-form";
import { LoginState } from "types";

const LoginPage = () => {
  const { error, mutateAsync, isLoading } = useLoginMutation();
  const { control, handleSubmit, reset } = useForm<LoginState>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmitForm = handleSubmit(async (data) => {
    mutateAsync(data)
      .then(
        ({
          data: {
            data: { user, token },
          },
        }) => {
          sessionStorage.setItem("user", JSON.stringify(user));
          sessionStorage.setItem("token", token);
        }
      )
      .catch((err) => {
        console.log("error", err.message);
        reset({ email: "", password: "" });
      });
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
              name={"email"}
              rules={{
                required: "This field is required",
                pattern: {
                  value: REGEX.EMAIL,
                  message: "Please provide a valid e-mail address.",
                },
              }}
              renderStyleProps={{
                placeholder: "E-mail",
                variant: "flushed",
                type: "text",
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
            <Button isLoading={isLoading} type={"submit"} colorScheme={"teal"}>
              Login
            </Button>
            <Heading py={2} textAlign={"center"} fontSize={"sm"}>
              You don&lsquo;t have account?{" "}
              <Link passHref={true} href={"/register"}>
                <ChakraLink color={"teal"}>Register</ChakraLink>
              </Link>
            </Heading>
          </Stack>
        </form>
        {error && (
          <Alert mt={4} borderRadius={4} color={"black"} status="error">
            <AlertIcon />
            Something went wrong. Check your credentials.
          </Alert>
        )}
      </Fragment>
    </LoginRegisterLayout>
  );
};

export default LoginPage;
