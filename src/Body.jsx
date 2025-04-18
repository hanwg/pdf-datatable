import { useState } from "react";
import "./styles.css";

import UploadPdf from "./UploadPdf";
import SelectCsvElement from "./SelectCsvElement";

export default function Body() {

    const [activeStep, setActiveStep] = useState('UploadPdf');
    const [files, setFiles] = useState([]);

    return (
        <>
            <div className="container my-5">
                <h1>PDF to CSV Converter (Works in progress)</h1>
            </div>

            <div className={activeStep === 'UploadPdf' ? 'container my-5' : 'hidden'}>
                <UploadPdf setActiveStep={setActiveStep} setFiles={setFiles} />
            </div>

            <div className={activeStep === 'SelectCsvElement' ? 'container my-5' : 'hidden'}>
                <SelectCsvElement setActiveStep={setActiveStep} files={files} />
            </div>
        </>
    );
}