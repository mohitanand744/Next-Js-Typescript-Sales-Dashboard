"use client";

export function createUnhandledError(error: Error) {
  console.error("Unhandled error:", error);
  // You can implement additional error handling logic here
  return error;
} 