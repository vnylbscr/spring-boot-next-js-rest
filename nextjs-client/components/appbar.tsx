import { MoonIcon, SunIcon } from "@assets/icons";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Input,
  Stack,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import useSearchStore from "global-store/useSearchStore";
import useDebounce from "hooks/useDebounce";
import Link from "next/link";
import React, { useEffect, useRef } from "react";

const iconSettings = {
  width: 20,
  height: 20,
};

const Appbar: React.FC = ({}) => {
  const { toggleColorMode } = useColorMode();
  const { setSearchValue, addSearchHistory, searchHistory, searchValue } =
    useSearchStore();
  const debouncedValue = useDebounce(searchValue.trim(), 1000);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const cmdK = (e: KeyboardEvent) => {
      if (e.metaKey && e.key === "k") {
        inputRef.current?.focus();
      }
      if (e.key === "Escape") {
        inputRef.current?.blur();
      }
    };

    document.addEventListener("keydown", cmdK);

    return () => {
      document.removeEventListener("keydown", cmdK);
    };
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  console.log("searchValue", debouncedValue);
  console.log("search history", searchHistory);
  console.log("search value", searchValue);

  useEffect(() => {
    if (debouncedValue.trim().length > 0) {
      addSearchHistory(debouncedValue);
    }
    if (debouncedValue.trim().length === 0) {
      setSearchValue("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

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
      position="sticky"
      top={"0"}
    >
      <Flex align="center" mr={5}>
        <Link passHref={true} href="/">
          <Button
            variant={"outline"}
            fontStyle={"italic"}
            fontWeight={"bold"}
            fontSize={"xl"}
          >
            {" "}
            Notestack.{" "}
          </Button>
        </Link>
      </Flex>

      <Flex width={"4xl"}>
        <Input
          placeholder="Search your notes"
          onChange={handleSearch}
          variant="filled"
          size="lg"
          ref={inputRef}
        />
      </Flex>

      <Box>
        <Stack direction={"row"}>
          <IconButton
            aria-label="Toggle theme"
            colorScheme={useColorModeValue("purple", "yellow")}
            icon={useColorModeValue(
              <MoonIcon {...iconSettings} />,
              <SunIcon {...iconSettings} />
            )}
            onClick={toggleColorMode}
          />

          <Link href={"/shortcuts"} passHref>
            <Button colorScheme={"teal"}>Shortcuts</Button>
          </Link>
        </Stack>
      </Box>
    </Flex>
  );
};

export default Appbar;
