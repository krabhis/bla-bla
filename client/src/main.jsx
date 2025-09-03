import { StrictMode, useMemo } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { Provider as ReduxProvider } from "react-redux";
import createStore from "./store";
import App from "./App.jsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) throw new Error("Missing Publishable Key");





function ReduxProviderWrapper() {
  const { getToken } = useAuth();

  const store = useMemo(() => createStore(getToken), [getToken]);

  return (
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>
  );
}



createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <ReduxProviderWrapper />
    </ClerkProvider>
  </StrictMode>
);
