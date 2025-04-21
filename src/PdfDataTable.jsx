import { useState } from "react";

import Navbar from "./Navbar";
import Footer from "./Footer";

import SelectPdf from "./pdfdatatable/SelectPdf";
import SelectCsvElement from "./pdfdatatable/SelectCsvElement";
import CsvTransform from "./pdfdatatable/CsvTransform";

export default function PdfDataTable() {

    const [activeStep, setActiveStep] = useState('SelectPdf');
    const [files, setFiles] = useState([]);

    return (
        <>
            <title>PDF DataTable | FAQ</title>
            <Navbar />

            <div className={activeStep === 'SelectPdf' ? 'container my-5' : 'hidden'}>
                <SelectPdf setActiveStep={setActiveStep} setFiles={setFiles} />
            </div>

            <div className={activeStep === 'SelectCsvElement' ? 'container my-5' : 'hidden'}>
                <SelectCsvElement setActiveStep={setActiveStep} files={files} />
            </div>

            <div className={activeStep === 'CsvTransform' ? 'container my-5' : 'hidden'}>
                <CsvTransform setActiveStep={setActiveStep} files={files} />
            </div>

            <Footer />
        </>
    );
}