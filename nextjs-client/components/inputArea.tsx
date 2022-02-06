import { Collapse, useOutsideClick } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import MyInput from "./my-input";

interface IState {
  text: string;
  title: string;
}

type Props = {
  onSubmit: (data: IState) => void;
};

const InputArea: React.FC<Props> = ({ onSubmit }) => {
  const { control, handleSubmit } = useForm<IState>({
    defaultValues: {
      title: "",
      text: "",
    },
  });
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useOutsideClick({
    ref: inputRef,
    handler: () => setFocused(false),
  });

  const onSubmitForm = handleSubmit(async (data) => {
    console.log(data);
    onSubmit(data);
  });

  return (
    <div ref={inputRef} style={{ width: "100%" }}>
      <form onSubmit={onSubmitForm} style={{ width: "100%" }}>
        {
          <Collapse in={focused} animateOpacity={true}>
            <MyInput
              control={control}
              name={"title"}
              renderStyleProps={{
                width: "full",
                height: "40px",
                fontSize: 20,
                placeholder: "Enter title",
                variant: "flushed",
                onFocus: () => setFocused(true),
              }}
            />
          </Collapse>
        }

        <MyInput
          control={control}
          name={"text"}
          renderStyleProps={{
            width: "full",
            height: "80px",
            fontSize: 28,
            placeholder: "What needs to be done?",
            variant: "flushed",
            onFocus: () => setFocused(true),
          }}
        />
      </form>
    </div>
  );
};

export default InputArea;
