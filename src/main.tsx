import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, HashRouter } from "react-router-dom";

const Router = __OFFLINE__ ? HashRouter : BrowserRouter;
import App from "./App";
import ErrorBoundary from "@/components/ErrorBoundary";
import { LangProvider } from "@/lib/i18n";
import { LiteProvider } from "@/lib/prefs";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary><LiteProvider><LangProvider><Router><App /></Router></LangProvider></LiteProvider></ErrorBoundary>
  </StrictMode>,
);
