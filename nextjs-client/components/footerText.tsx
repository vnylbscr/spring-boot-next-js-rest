import { Flex, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";

const FooterText = () => {
  return (
    <Flex
      bgColor={useColorModeValue("blue.200", "blue.800")}
      justify={"center"}
      alignItems={"center"}
      p={4}
    >
      <Text fontStyle={"italic"}>
        Copyright {new Date().getFullYear()} NoteStack.{" "}
      </Text>
    </Flex>
  );
};

export default FooterText;
