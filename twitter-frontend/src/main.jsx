import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext";
import * as Sentry from "@sentry/react";
const sentryDsn = import.meta.env.VITE_SENTRY_DSN;

Sentry.init({
  dsn: sentryDsn,
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <Sentry.ErrorBoundary fallback={<p>Something went wrong</p>}>
        <App />
      </Sentry.ErrorBoundary>
    </AuthProvider>
  </StrictMode>
);
