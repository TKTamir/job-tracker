import type {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {SerializedError} from "@reduxjs/toolkit";

type ErrorWithMessage = { message?: string };

function isFetchBaseQueryErrorWithMessage(
  error: FetchBaseQueryError
): error is FetchBaseQueryError & { data: ErrorWithMessage } {
  return (
    typeof error.data === "object" &&
    error.data !== null &&
    "message" in error.data
  );
}

export const getServerError = (
  error: FetchBaseQueryError | SerializedError | undefined
): string | null => {
  if (!error) return null;

  if ("status" in error && isFetchBaseQueryErrorWithMessage(error)) {
    return error.data.message ?? null;
  }

  return null;
};