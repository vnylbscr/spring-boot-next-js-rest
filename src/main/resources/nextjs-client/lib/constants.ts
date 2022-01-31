export const isServer = typeof window === "undefined";

export const END_POINT =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_LOCAL_ENDPOINT
    : process.env.NEXT_PUBLIC_PRODUCTION_URL;

export const REGEX = {
  EMAIL:
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
};
