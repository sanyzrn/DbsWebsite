import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { SiteConfigProvider } from "./config/siteConfig";
import { LanguageProvider } from "./config/languageConfig";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LanguageProvider>
      <SiteConfigProvider>
        <App />
      </SiteConfigProvider>
    </LanguageProvider>
  </StrictMode>
);
