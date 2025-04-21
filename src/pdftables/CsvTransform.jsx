import { useRef, useState } from 'react';

export default function CsvTransform({ setActiveStep, files }) {

    const downloadLink = useRef();

    const [columnDelimiter, setColumnDelimiter] = useState(",");
    const [lineDelimiter, setLineDelimiter] = useState("\r\n");
    const [quoteCharacter, setQuoteCharacter] = useState('"');

    const csvLines = getCsvLines();
    if (!csvLines || csvLines.length < 1) {
        return (
            <></>
        );
    }

    function getCsvLines() {
        return JSON.parse(localStorage.getItem("csvLines"));
    }

    function nextButtonClicked() {
        const csvLines = getCsvLines();
        const csv = renderCsv(csvLines);
        const blob = new Blob([csv], { type: "text/csv" });

        downloadLink.current.download = getCsvFilename(files[0]);
        downloadLink.current.href = URL.createObjectURL(blob);
        downloadLink.current.click();
    }

    function getCsvFilename(file) {
        const index = file.name.lastIndexOf(".");
        return file.name.substring(0, index) + ".csv";
    }

    function renderCsv(csvLines) {
        return csvLines.map(line => renderCsvLine(line))
            .join(lineDelimiter);
    }

    function renderCsvLine(line) {
        return line.map(column =>
                quoteCharacter +
                column.replaceAll(quoteCharacter, quoteCharacter + quoteCharacter) + // escape quotes
                quoteCharacter)
            .join(columnDelimiter);
    }

    return (
        <>
            <div className="container my-5">

                <div className="alert alert-info" role="alert">
                    Customize your CSV output
                </div>

                <div className="text-end my-3">
                    <button type="button" className="btn btn-primary" onClick={nextButtonClicked}>Download CSV</button>
                    <a ref={downloadLink} className="hidden" href="/">Download CSV</a>
                </div>

                <table className="table table-striped">

                    <thead>
                        <tr>
                            {
                                csvLines[0].map((column) => (
                                    <th>{ column }</th>
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