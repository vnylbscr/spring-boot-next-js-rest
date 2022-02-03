import { MoonIcon, SunIcon } from "@assets/icons";
import {
  Box,
  Flex,
  IconButton,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

const iconSettings = {
  width: 20,
  height: 20,
};

const Appbar = () => {
  const { toggleColorMode } = useColorMode();
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      width="100%"
      zIndex={100}
      padding={4}
      bgColor={useColorModeValue("blue.200", "blue.800")}
    >
      <Flex align="center" mr={5}>
        <Text fontStyle={"italic"} fontWeight={"bold"} fontSize={"xl"}>
          {" "}
          Notestack.{" "}
        </Text>
      </Flex>

      <Box ml={"auto"}>
        <IconButton
          aria-label="Toggle theme"
          colorScheme={useColorModeValue("purple", "yellow")}
          icon={useColorModeValue(
            <MoonIcon {...iconSettings} />,
            <SunIcon {...iconSettings} />
          )}
          onClick={toggleColorMode}
        />
      </Box>
    </Flex>
  );
};

export default Appbar;
