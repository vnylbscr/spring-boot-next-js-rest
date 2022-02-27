import { Flex, Text } from "@chakra-ui/react";
import React from "react";

const FooterText = () => {
  return (
    <Flex justify={"center"} alignItems={"center"} p={4}>
      <Text fontStyle={"italic"}>
        Copyright {new Date().getFullYear()} NoteStack.{" "}
      </Text>
    </Flex>
  );
};

export default FooterText;
