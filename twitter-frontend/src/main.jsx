import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext";
import * as Sentry from "@sentry/react";
const sentryDsn = import.meta.env.VITE_SENTRY_DSN;

import { GrowthBook, GrowthBookProvider } from "@growthbook/growthbook-react";

const gb = new GrowthBook({
  apiHost: "https://cdn.growthbook.io",
  clientKey: import.meta.env.VITE_GROWTHBOOK_CLIENT_KEY,
  user: { id: "user-id-123" },
  onFeatureUsage: (key, result) => {
    console.log("Feature used:", key, result);
  },
});

gb.loadFeatures().then(() =>
  console.log("GrowthBook connected", gb.getFeatures())
);

Sentry.init({
  dsn: sentryDsn,
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <GrowthBookProvider growthbook={gb}>
        <Sentry.ErrorBoundary fallback={<p>Something went wrong</p>}>
          <App />
        </Sentry.ErrorBoundary>
      </GrowthBookProvider>
    </AuthProvider>
  </StrictMode>
);
