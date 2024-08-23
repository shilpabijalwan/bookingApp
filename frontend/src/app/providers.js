// app/providers.tsx
"use client";

import { store } from "@/redux/store";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";

export function Providers({ children }) {
  return (
    <Provider store={store}>
      <ChakraProvider>{children}</ChakraProvider>
    </Provider>
  );
}
