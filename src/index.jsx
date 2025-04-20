import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';

import Nav from "./Nav";
import PdfTables from "./pdftables/PdfTables";

import "./assets/styles.css";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
    <StrictMode>
        <BrowserRouter>
            <Nav />
            <PdfTables />
        </BrowserRouter>
    </StrictMode>
);
