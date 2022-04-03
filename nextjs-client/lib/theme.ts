import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  // fonts: {
  //   heading: "Fira Code, monospace",
  //   body: "Fira Code, monospace",
  // },
});

export default theme;
