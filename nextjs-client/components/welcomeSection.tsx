import { Heading } from "@chakra-ui/react";
import useSearchStore from "global-store/useSearchStore";
import React, { Fragment } from "react";

type Props = {
  username: string;
};

const WelcomeSection = (props: Props) => {
  console.log("rendered");

  return (
    <Fragment>
      <Heading>Welcome, {props.username} </Heading>
      <Heading fontSize={"xl"}>
        Today is{" "}
        {new Date().toLocaleDateString("en-US", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })}{" "}
        {"\n"}
        {new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: false,
        })}
      </Heading>
    </Fragment>
  );
};

export default React.memo(WelcomeSection);
