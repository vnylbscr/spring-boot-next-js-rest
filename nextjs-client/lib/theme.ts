import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  // fonts: {
  //   heading: "Source Sans Pro, sans-serif",
  //   body: "Source Sans Pro, sans-serif",
  // },
});
