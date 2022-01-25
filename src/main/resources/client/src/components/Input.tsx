import { Input, InputProps, Stack, Text } from '@chakra-ui/react';
import React, { Fragment } from 'react';
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';
import { WarningIcon } from '../assets/icons';

interface Props<T> extends UseControllerProps<T> {
  renderStyleProps?: InputProps;
}

const MyInput = <T extends FieldValues>(props: Props<T>) => {
  const { renderStyleProps, ...rest } = props;

  return (
    <Controller
      {...rest}
      render={({ field, fieldState: { error } }) => (
        <Fragment>
          <Input {...renderStyleProps} {...field} />
          {error && (
            <Stack
              spacing={2}
              alignItems={'center'}
              direction={'row'}
              color={'pink.600'}
            >
              <WarningIcon width={18} height={18} />
              <Text fontSize={'xs'} my={1}>
                {error.message}
              </Text>
            </Stack>
          )}
        </Fragment>
      )}
    />
  );
};

export default MyInput;
