"use client";

import { useCallback, useEffect } from 'react';

export default function useErrorHandler() {
  const handleError = useCallback((error: Error) => {
    console.error("Caught an error:", error);
    // You can implement more sophisticated error handling here
  }, []);

  useEffect(() => {
    const errorHandler = (event: ErrorEvent) => {
      event.preventDefault();
      handleError(event.error);
    };

    const rejectionHandler = (event: PromiseRejectionEvent) => {
      event.preventDefault();
      handleError(new Error(event.reason || "Promise rejected"));
    };

    window.addEventListener('error', errorHandler);
    window.addEventListener('unhandledrejection', rejectionHandler);

    return () => {
      window.removeEventListener('error', errorHandler);
      window.removeEventListener('unhandledrejection', rejectionHandler);
    };
  }, [handleError]);

  return { handleError };
} 