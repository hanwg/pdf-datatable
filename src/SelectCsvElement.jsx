import { useState, useEffect } from 'react';
import "./styles.css";
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

export default function SelectCsvElement({ files }) {

    return (
        <>
            <div className="alert alert-info" role="alert">
                Select the first element of your CSV.
                Any content before the selected element will not be included in the CSV.
            </div>

            <Document file={files[0]}>
                <Page pageNumber={1} />
            </Document>
        </>
    );
}