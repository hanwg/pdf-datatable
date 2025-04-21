import { useState } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';

import { saveCsv } from '../utils.js';

import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

// https://www.npmjs.com/package/react-pdf
// https://github.com/wojtekmaj/react-pdf/wiki/Recipes
export default function SelectCsvElement({ setActiveStep, files, setCsvLines }) {

    const [numPages, setNumPages] = useState(0);

    let pagesRendered = 0;

    function onDocumentLoad(pdf) {
        setNumPages(pdf.numPages);
    }

    function onTextLayerRender() {
        pagesRendered++;

        // wait for all pages to finish rendering
        if (pagesRendered === numPages) {
            const textElements = document.querySelectorAll('span[role="presentation"]');

            for (const textElement of textElements) {
                textElement.addEventListener('click', textElementClicked);
            }
        }
    }

    /**
        This does the following:
        1) exclude elements from CSV by adding the "excluded" attribute to the element
        2) highlight all elements on the same line as the selected element (i.e. the CSV headers) by adding "selected" attribute
     */
    function textElementClicked(event) {
        const textElements = document.querySelectorAll('span[role="presentation"]');

        const targetPageNumber = event.target.parentElement.parentElement.getAttribute("data-page-number");

        const pages = [];
        for (let i = 0; i < numPages; i++) {
            // data structure so that we can easily lookup elements on the same line
            pages.push(new Map());
        }

        for (const textElement of textElements) {
            if (textElement.textContent.trim() === "") {
                continue;
            }

            // clear previous selection
            textElement.removeAttribute("selected");
            textElement.removeAttribute("excluded");
            textElement.removeAttribute("title");

            const textElementPageNumber = textElement.parentElement.parentElement.getAttribute("data-page-number");
            if (textElementPageNumber < targetPageNumber ||
                (targetPageNumber === textElementPageNumber && parseStyle(event.target.style.top) > parseStyle(textElement.style.top))) {

                // exclude elements before header
                textElement.setAttribute("excluded", "true");
                textElement.setAttribute("title", "This element appears before the headers");
            } else {

                // populate the data structure
                const lines = pages[textElementPageNumber - 1];
                const siblings = lines.get(textElement.style.top) ?? [];
                siblings.push(textElement);
                lines.set(textElement.style.top, siblings);
            }

            // highlight CSV headers
            if (event.target.style.top === textElement.style.top && targetPageNumber === textElementPageNumber) {
                textElement.setAttribute("selected", "true");
            }
        }

        // format lines for our csv
        const csvLines = [];
        const headers = pages[targetPageNumber - 1].get(event.target.style.top);
        for (const page of pages) {
            for (const line of page.values()) {
                const excludeReason = formatLine(csvLines, page, headers, line);
                if (excludeReason) {
                    // exclude all elements in the line
                    for (const textElement of line) {
                        textElement.setAttribute("excluded", "true");
                        textElement.setAttribute("title", excludeReason);
                    }
                }
            }
        }

        saveCsv(csvLines);
    }

    // return the reason if a line can't be formatted
    function formatLine(csvLines, page, headers, line) {

        // don't do anything if this line is our header
        if (line[0].hasAttribute("selected")) {
            const csvLine = toCsv(line);
            csvLines.push(csvLine);
            return null;
        }

        // columns don't match
        if (line.length < headers.length) {
            return "This line doesn't have the right number of columns as the headers. Expected: " + headers.length + ", Found: " + line.length;
        }

        // if this line has the same content as the headers, exclude it
        let isDuplicatedHeader = true;
        for (let i = 0; i < headers.length; i++) {
            if (headers[i].textContent !== line[i].textContent) {
                isDuplicatedHeader = false;
                break;
            }
        }
        if (isDuplicatedHeader) {
            return "Duplicated headers";
        }

        // format the line
        for (let i = 0; i < headers.length; i++) {
            //TODO

        }
        const csvLine = toCsv(line);
        csvLines.push(csvLine);

        return null;
    }

    function toCsv(textElements) {
        const csvLine = [];
        for (const textElement of textElements) {
            csvLine.push(textElement.textContent);
        }

        return csvLine;
    }

    function parseStyle(style) {
        const string = style.replace('%', '');
        return Number(string);
    }

    function nextButtonClicked(event) {
        setActiveStep("CsvTransform");
    }

    return (
        <>
            <div className="alert alert-info" role="alert">
                Select the headers of your CSV
            </div>

            <div className="text-end">
                <button id="nextButton" type="button" className="btn btn-primary" onClick={nextButtonClicked}>Transform CSV</button>
            </div>

            <div className="mt-3">
                <Document file={files[0]} onLoadSuccess={onDocumentLoad} className="pdfDocument">
                    {Array.from(
                        new Array(numPages),
                        (el, index) => (
                            <Page
                                key={`page_${index + 1}`}
                                pageNumber={index + 1}
                                onRenderTextLayerSuccess={onTextLayerRender}
                                scale={1.5}
                                className="pdfPage"
                            />
                        )
                    )}
                </Document>
            </div>
        </>
    );
}