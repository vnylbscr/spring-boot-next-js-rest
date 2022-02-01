import { ChakraProvider } from "@chakra-ui/react";
import { isServer } from "@lib/constants";
import "@styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [auth, setAuth] = useState(false);
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    authCheck(router.asPath);
  }, []);

  function authCheck(url: string) {
    // redirect to login page if accessing a private page and not logged in
    const publicPaths = ["/login", "/register"];
    const path = url.split("?")[0];

    if (!localStorage.getItem("token") && !publicPaths.includes(path)) {
      setAuth(false);
      router.push({
        pathname: "/login",
        query: { returnUrl: router.asPath },
      });
    } else {
      setAuth(true);
    }
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ChakraProvider>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
