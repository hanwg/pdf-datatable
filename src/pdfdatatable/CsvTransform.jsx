import { useRef, useState, useEffect } from 'react';
import ReactGA from 'react-ga4';

import { loadCsv } from '../utils.js';

export default function CsvTransform({ setActiveStep, files }) {

    const downloadLink = useRef();

    const [csvFilename, setCsvFilename] = useState("");
    const [columnDelimiter, setColumnDelimiter] = useState(",");
    const [rowDelimiter, setRowDelimiter] = useState("\r\n");
    const [quoteCharacter, setQuoteCharacter] = useState('"');

    useEffect(() => {
        const csvFilename = getCsvFilename(files[0]);
        setCsvFilename(csvFilename);
    }, [files])

    const csvLines = loadCsv();
    if (!csvLines || csvLines.length < 1) {
        return (
            <></>
        );
    }

    function nextButtonClicked() {
        const csvLines = loadCsv();
        const csv = renderCsv(csvLines);
        const blob = new Blob([csv], { type: "text/csv" });

        downloadLink.current.download = csvFilename;
        downloadLink.current.href = URL.createObjectURL(blob);

        ReactGA.event({
            category: "Pdf Datatable",
            action: "Download Csv"
        });

        downloadLink.current.click();
    }

    function getCsvFilename(file) {
        if (!file || file.length < 1) {
            return "";
        }

        const index = file.name.lastIndexOf(".");
        return file.name.substring(0, index) + ".csv";
    }

    function renderCsv(csvLines) {
        return csvLines.map(line => renderCsvLine(line))
            .join(rowDelimiter);
    }

    function renderCsvLine(line) {
        return line.map(column =>
                quoteCharacter +
                column.replaceAll(quoteCharacter, quoteCharacter + quoteCharacter) + // escape quotes
                quoteCharacter)
            .join(columnDelimiter);
    }

    // form input functions

    function csvFilenameChanged(event) {
        setCsvFilename(event.target.value);
    }

    function columnDelimiterChanged(event) {
        let char = event.currentTarget.value;
        if (char === "\\t") {
            char = "\t";
        }

        setColumnDelimiter(char);
    }

    function rowDelimiterWindows(event) {
        setRowDelimiter("\r\n");
    }

    function rowDelimiterLinux(event) {
        setRowDelimiter("\n");
    }

    function quoteCharacterChanged(event) {
        setQuoteCharacter(event.target.value);
    }

    return (
        <>
            <div className="container my-5">

                <div className="alert alert-info" role="alert">
                    Customize your CSV output
                </div>

                <form className="border rounded px-3 py-3">

                    <legend>CSV Options</legend>

                    <div className="form-group row">
                        <label htmlFor="csvFilename" className="col-sm-2 col-form-label">CSV filename</label>
                        <div className="col-sm-10">
                            <input type="text" id="csvFilename" className="form-control" value={csvFilename} onChange={csvFilenameChanged} />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="quoteCharacter" className="col-sm-2 col-form-label">Quote character</label>
                        <div className="col-sm-10">
                            <input id="quoteCharacter" type="text" className="form-control" value={quoteCharacter} onChange={quoteCharacterChanged} />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="columnDelimiter" className="col-sm-2 col-form-label">Column delimiter</label>
                        <div className="col-sm-10">
                            <select id="columnDelimiter" className="form-select" onChange={columnDelimiterChanged} value={columnDelimiter}>
                                <option value=",">Comma (,)</option>
                                <option value=";">Semicolon (;)</option>
                                <option value="\t">Tab (\t)</option>
                                <option value="|">Pipe (|)</option>
                                <option value=" ">Space</option>
                            </select>
                        </div>
                    </div>

                    <fieldset className="row">
                        <legend className="col-form-label col-sm-2 pt-0">Row delimiter</legend>
                        <div className="col-sm-10">
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="rowDelimiter" id="rowDelimiterWindows" value="\r\n" onChange={rowDelimiterWindows} defaultChecked="true" />
                                <label className="form-check-label" htmlFor="rowDelimiterWindows">
                                    Windows CRLF (\r\n)
                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="rowDelimiter" id="rowDelimiterLinux" value="\n" onChange={rowDelimiterLinux} />
                                <label className="form-check-label" htmlFor="rowDelimiterLinux">
                                    Linux LF (\n)
                                </label>
                            </div>
                        </div>
                    </fieldset>
                </form>

                <div className="text-end my-3">
                    <button type="button" className="btn btn-primary" onClick={nextButtonClicked}>Download CSV</button>
                    <a ref={downloadLink} className="hidden" href="/">Download CSV</a>
                </div>

                <div className="pb-3"><i>{csvLines.length} records found</i></div>
                <table className="table table-striped" id="datatable">

                    <thead>
                        <tr>
                            {
                                csvLines[0].map((column) => (
                                    <th key={column}>{ column }</th>
                                ))
                            }
                        </tr>
                    </thead>

                    <tbody>
                    {
                        csvLines.splice(1).map(function(csvLine) {
                            return (
                                <tr>
                                    {
                                        csvLine.map((column) => (
                                            <td>{ column }</td>
                                        ))
                                    }
                                </tr>
                            )
                        })
                    }
                    </tbody>

                </table>
            </div>
        </>
    );
}