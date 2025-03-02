import { createRoot } from "react-dom/client";
import { AuthProvider } from "./contexts/authContext.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import { system } from "@chakra-ui/react/preset";
import { Toaster } from "react-hot-toast";
import "./styles.css";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <ChakraProvider value={system}>
    <AuthProvider>
      <App />
      <Toaster />
    </AuthProvider>
  </ChakraProvider>
);
