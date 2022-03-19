/* eslint-disable react/no-unescaped-entities */
import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react";
import NoteItem from "@components/noteItem";
import SkeletonNote from "@components/skeleton";
import AnimationPageLayout from "@layouts/animation-layout";
import AppLayout from "@layouts/appLayout";
import { END_POINT } from "@lib/constants";
import axios from "axios";
import cookie from "cookie";
import { useTypeSafeQuery } from "hooks/useTypeSafeQuery";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { User } from "types";

type Props = {
  user: User;
  token: string;
};

const SearchPage: React.FC<Props> = ({ user, token }) => {
  const router = useRouter();
  const searchValue = router.query.q as string;

  const { data, error, isLoading, refetch, isRefetching } = useTypeSafeQuery(
    "searchNote",
    {
      enabled: Boolean(searchValue),
    },
    {
      token: token,
      user: user.id,
      data: searchValue,
    }
  );

  useEffect(() => {
    if (!router.isReady) return;
    if (searchValue) {
      refetch();
    }
  }, [refetch, router.isReady, searchValue]);

  console.log("is loading", isLoading);

  if (isLoading || isRefetching) {
    return (
      <AppLayout>
        <Box padding="6" boxShadow="lg" bg="transparent" width={"full"}>
          {[1, 2, 3].map((item, index) => {
            return <SkeletonNote key={index} />;
          })}
        </Box>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <AnimationPageLayout>
        <Stack width={"full"} height={"100vh"} padding={8}>
          {data?.data.length === 0 ? (
            <Flex direction={"column"} justify="center" align={"center"}>
              <Text align={"center"} fontSize={"2xl"}>
                No results found for: "{searchValue}"{" "}
              </Text>
              <Button onClick={() => router.back()}>Go back</Button>
            </Flex>
          ) : (
            <Flex direction={"column"}>
              <Text textAlign={"center"} fontSize="3xl" fontWeight={"bold"}>
                Found {data?.data.length} results for: "{searchValue}"
              </Text>
              {data?.data.map((note) => (
                <Flex direction={"column"} w="full" key={note.id}>
                  <NoteItem note={note} />
                </Flex>
              ))}
            </Flex>
          )}
        </Stack>
      </AnimationPageLayout>
    </AppLayout>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const cookies = cookie.parse(context.req.headers.cookie || "");

    if (cookies.isLoggedIn === "true" && cookies.token) {
      const res = await axios
        .get(`${END_POINT}/auth/verify`, {
          headers: {
            token: cookies.token,
          },
        })
        .then((res) => res.data);

      if (!context.query.q) {
        return {
          redirect: {
            destination: "/",
            permanent: false,
          },
        };
      }

      return {
        props: {
          user: res.data,
          token: cookies.token,
        },
      };
    }
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  } catch (error: any) {
    if (error.response.status === 401) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
  }
}

export default SearchPage;
