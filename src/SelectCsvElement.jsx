import { useState, useEffect } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';

import "./styles.css";
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

// https://www.npmjs.com/package/react-pdf
// https://github.com/wojtekmaj/react-pdf/wiki/Recipes
export default function SelectCsvElement({ files }) {

    const [page, setPage] = useState();

    useEffect(() => {
         async function parsePageText() {
             debugger
             const textLayer = await page.getTextContent();

             let lines = [];
             let line = [];
             let xTranslation = 0;
             for (const item of textLayer.items) {
                 if (item.transform[4] >= xTranslation) {
                     xTranslation = item.transform[4];
                     line.push(item);
                 } else {
                     // new line
                     lines.push(line);
                     line = [];
                     xTranslation = item.transform[4];
                 }
             }
         }

        if (page) {
            parsePageText();
        }
      }, [page])

    function onPageLoad(page) {
        setPage(page);
    }

    function onTextLayerRender() {
        const textElements = document.querySelectorAll('span[role="presentation"]');
        for (const textElement of textElements) {
            textElement.addEventListener('click', (event) => {
                // TODO event.target.textContent;
            });
        }
    }

    return (
        <>
            <div className="alert alert-info" role="alert">
                Select the first element of your CSV. <br />
                Any content before the selected element will not be included in the CSV.
            </div>

            <Document file={files[0]}>
                <Page pageNumber={1} onRenderTextLayerSuccess={onTextLayerRender} onLoadSuccess={onPageLoad}/>
            </Document>
        </>
    );
}