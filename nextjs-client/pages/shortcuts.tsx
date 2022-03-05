import { Container } from "@chakra-ui/react";
import AnimationPageLayout from "@layouts/animation-layout";
import AppLayout from "@layouts/appLayout";
import React from "react";

type Props = {};

const ShortcutsPage = (props: Props) => {
  return (
    <AppLayout title={"Shortcuts"}>
      <AnimationPageLayout>
        <Container bg={"AppWorkspace"} maxW={"container.xl"} h="100vh">
          <h1>Shortcuts</h1>
          <p>
            <strong>Ctrl + S</strong> - Save
          </p>
          <p>
            <strong>Ctrl + Shift + S</strong> - Save as
          </p>
        </Container>
      </AnimationPageLayout>{" "}
    </AppLayout>
  );
};

export default ShortcutsPage;
