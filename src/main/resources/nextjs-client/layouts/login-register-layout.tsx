import { BackgroundProps, Container, Flex } from "@chakra-ui/react";
import React from "react";

const LoginRegisterLayout: React.FC<{
  bgColor?: Pick<BackgroundProps, "background">;
}> = ({ children }) => {
  return (
    <Flex
      h={"100vh"}
      background={"gray.700"}
      alignItems={"center"}
      justifyContent={"center"}
      color={"#fff"}
    >
      <Container
        background={"gray.800"}
        borderRadius={"md"}
        maxW={"md"}
        p={"12"}
      >
        {children}
      </Container>
    </Flex>
  );
};

export default LoginRegisterLayout;
