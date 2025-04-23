import { useState, useEffect } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import ReactGA from 'react-ga4';

import PasswordDialog from './PasswordDialog';
import { saveCsv, xIntersect } from '../utils.js';

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
    const [showPasswordDialog, setShowPasswordDialog] = useState(false);
    const [key, setKey] = useState(0);
    const [password, setPassword] = useState("");
    const [isPasswordValid, setIsPasswordValid] = useState(true);

    useEffect(() => {
        // trigger reload of document when password is ready
        setKey(k => k + 1);
      }, [password, showPasswordDialog]);

    let pagesRendered = 0;
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
        let isOutOfProximity = false;
        const csvLines = [];
        const headers = pages[targetPageNumber - 1].get(event.target.style.top);
        for (let i = 0; i < pages.length; i++) {
            const lines = pages[i].keys()
                .toArray()
                .sort(function (o1, o2) { return Number(o1.replace("%", "") - Number(o2.replace("%", "")))});
            let prevLine = null;

            for (const line of lines) {
                isOutOfProximity = formatLine(csvLines, pages[i], headers, prevLine, pages[i].get(line), isOutOfProximity);
                prevLine = pages[i].get(line);
            }
            isOutOfProximity = true;
        }

        for (const csvLine of csvLines) {
            console.log(csvLine.join("|"));

        }
        saveCsv(csvLines);
    }

    // return the reason if a line can't be formatted
    function formatLine(csvLines, page, headers, prevLine, line, isOutOfProximity) {

        const lineStr = line.map(column => column.textContent)
            .join("|");
        if (csvLines.length > 0) {
            const headerStr = csvLines[0].join("|");
            if (headerStr === lineStr) {
                isOutOfProximity = false;
            }
        }

        // check proximity
        if (prevLine || isOutOfProximity) {
            let exclude = false;
            if (isOutOfProximity) {
                exclude = true;
            } else {
                const prevRect = prevLine[0].getBoundingClientRect();
                const bottom = prevRect.y + prevRect.height;
                const top = line[0].getBoundingClientRect().y;

                if (top - bottom >= 2 * prevRect.height) {
                    exclude = true;
                }
            }

            if (exclude) {
                for (const column of line) {
                    column.setAttribute("excluded", "true");
                    column.setAttribute("title", "Excluded due to proximity");
                }

                return true;
            }
        }

        // don't do anything if this line is our header
        if (line[0].hasAttribute("selected")) {
            const csvLine = toCsv(line);
            csvLines.push(csvLine);
            return;
        }

        const leftLimit = headers[0].getBoundingClientRect().x;
        const rightLimit = headers[headers.length - 1].getBoundingClientRect().x + headers[headers.length - 1].getBoundingClientRect().width;

        const csvLine = [];
        let headerIndex = 0;
        let columnIndex = 0;
        while (csvLine.length < headers.length) {
            if (columnIndex >= line.length) {
                break;
            }

            const rect = line[columnIndex].getBoundingClientRect();
            if (rect.x + rect.width < leftLimit || rect.x > rightLimit) {
                line[columnIndex].setAttribute("excluded", "true");
                line[columnIndex].setAttribute("title", "Element is out of bounds");
                columnIndex++;
                continue;
            }

            if (xIntersect(headers, headerIndex, line[columnIndex])) {
                // concatenate the text
                csvLine[headerIndex] = csvLine[headerIndex] ? csvLine[headerIndex] + line[columnIndex].textContent : ""  + line[columnIndex].textContent;
                line[columnIndex].setAttribute("column", headerIndex);
                columnIndex++;
            } else {
                // next column
                headerIndex++;
            }
        }

        if (csvLine.length < 1) {
            return false;
        }

        // fill empty columns
        for (let i = 0; i < headers.length; i++) {
            if (!csvLine[i]) {
                csvLine[i] = "";
            }
        }

        csvLines.push(csvLine);
        return false;
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
        ReactGA.event({
            category: "Pdf Datatable",
            action: "Transform Csv"
        });

        setActiveStep("CsvTransform");
    }

    function promptPassword(callback, reason) {
        if (showPasswordDialog) {
            // wait for password
            return;
        }

        if (reason === 2) {
            // wrong password
            setIsPasswordValid(false);
            setPassword("");
            setShowPasswordDialog(true);
            return;
        }

        if (password === null) {
            // user cancelled the password dialog
            window.location.reload();
        } else if (password) {
            // password already provided
            callback(password);
            return;
        }

        setShowPasswordDialog(true);
    }

    return (
        <>
            <div className="alert alert-info" role="alert">
                Select the headers (or the 1st row) of your CSV
            </div>

            <div className="text-end">
                <button id="nextButton" type="button" className="btn btn-primary" onClick={nextButtonClicked}>Transform CSV</button>
            </div>

            <div className="mt-3">
                <Document file={files[0]} key={key}
                    onLoadSuccess={(pdf) => setNumPages(pdf.numPages)}
                    onPassword={promptPassword} className="pdfDocument">
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

            <PasswordDialog setPassword={setPassword} isVisible={showPasswordDialog} setIsVisible={setShowPasswordDialog} isPasswordValid={isPasswordValid} />
        </>
    );
}