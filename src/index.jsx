import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import Body from "./Body";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>

      <Body />
  </StrictMode>
);
