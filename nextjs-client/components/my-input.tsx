import { WarningIcon } from "@assets/icons";
import {
  Button,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { Fragment, useCallback, useState } from "react";
import { Controller, FieldValues, UseControllerProps } from "react-hook-form";

interface Props<T> extends UseControllerProps<T> {
  renderStyleProps?: InputProps;
}

const MyInput = <T extends FieldValues>(props: Props<T>) => {
  const { renderStyleProps, ...rest } = props;
  const [show, setShow] = useState(false);
  const handleClick = useCallback(() => {
    setShow((prev) => !prev);
  }, []);

  return (
    <Controller
      render={({ field, fieldState: { error } }) => (
        <Fragment>
          <InputGroup>
            <Input
              {...renderStyleProps}
              {...field}
              isInvalid={Boolean(error?.message)}
              type={
                renderStyleProps?.type === "password"
                  ? show
                    ? "text"
                    : "password"
                  : "text"
              }
            />
            {renderStyleProps?.type === "password" && field.value && (
              <InputRightElement>
                <Button
                  onClick={handleClick}
                  colorScheme={"teal"}
                  variant={"link"}
                >
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            )}
          </InputGroup>

          {error && (
            <Stack
              spacing={2}
              alignItems={"center"}
              direction={"row"}
              color={"red.600"}
            >
              <WarningIcon width={18} height={18} />
              <Text fontSize={"xs"} my={1}>
                {error.message}
              </Text>
            </Stack>
          )}
        </Fragment>
      )}
      {...rest}
    />
  );
};

export default MyInput;
