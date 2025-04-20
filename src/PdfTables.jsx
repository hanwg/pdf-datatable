import { useState } from "react";

import Navbar from "./Navbar";
import Footer from "./Footer";

import SelectPdf from "./pdftables/SelectPdf";
import SelectCsvHeaders from "./pdftables/SelectCsvHeaders";
import CsvTransform from "./pdftables/CsvTransform";

export default function PdfTables() {

    const [activeStep, setActiveStep] = useState('SelectPdf');
    const [files, setFiles] = useState([]);

    return (
        <>
            <Navbar />

            <div className={activeStep === 'SelectPdf' ? 'container my-5' : 'hidden'}>
                <SelectPdf setActiveStep={setActiveStep} setFiles={setFiles} />
            </div>

            <div className={activeStep === 'SelectCsvHeaders' ? 'container my-5' : 'hidden'}>
                <SelectCsvHeaders setActiveStep={setActiveStep} files={files} />
            </div>

            <div className={activeStep === 'CsvTransform' ? 'container my-5' : 'hidden'}>
                <CsvTransform setActiveStep={setActiveStep} files={files} />
            </div>

            <Footer />
        </>
    );
}