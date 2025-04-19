import { useState } from 'react';
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
export default function SelectCsvHeaders({ files }) {

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

        // for each line, check if it conforms to header
        // if not, exclude it
        const headers = pages[targetPageNumber - 1].get(event.target.style.top);
        for (const lines of pages) {
            for (const line of lines.values()) {
                const excludeReason = getExcludeReason(headers, line);
                if (excludeReason) {
                    // exclude all elements in the line
                    for (const textElement of line) {
                        textElement.setAttribute("excluded", "true");
                        textElement.setAttribute("title", excludeReason);
                    }
                }
            }
        }
    }

    function getExcludeReason(headers, line) {
        if (line[0].hasAttribute("selected")) {
            // this is our header
            return null;
        }

        // columns don't match
        // TODO check bounds
        if (line.length < headers.length) {
            return "Incorrect no. of columns: " + line.length;
        }

        // exclude duplicated headers
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
        return null;
    }

    function parseStyle(style) {
        const string = style.replace('%', '');
        return Number(string);
    }

    return (
        <>
            <div className="alert alert-info" role="alert">
                Select the headers of your CSV.
                The following will be excluded from the CSV:
                <ul>
                    <li>Any content before the headers</li>
                    <li>Any line that does not have the same format as the headers</li>
                    <li>Any line with the same content and format as the headers</li>
                    <li>Any image</li>
                </ul>
            </div>

            <div className="text-end">
                <button type="button" className="btn btn-primary" disabled>Transform CSV</button>
            </div>

            <div className="mt-3">
                <Document file={files[0]} onLoadSuccess={onDocumentLoad}>
                    {Array.from(
                        new Array(numPages),
                        (el, index) => (
                            <Page
                                key={`page_${index + 1}`}
                                pageNumber={index + 1}
                                onRenderTextLayerSuccess={onTextLayerRender}
                                className="pdfPage"
                            />
                        ),
                    )}
                </Document>
            </div>
        </>
    );
}