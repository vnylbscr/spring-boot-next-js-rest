import { Flex, Text } from "@chakra-ui/react";
import React from "react";

const FooterText = () => {
  return (
    <Flex justify={"center"} alignItems={"center"} p={4}>
      <Text>
        Made with{" "}
        <span role="img" aria-label="heart">
          ❤️
        </span>{" "}
        by Mert.
      </Text>
    </Flex>
  );
};

export default FooterText;
