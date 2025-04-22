import { useRef, useState } from 'react';
import ReactGA from 'react-ga4';

import pdfIcon from '../assets/pdf-icon.png';

// event.preventDefault() is used to prevent browser from navigating away when user drops a file
export default function SelectPdf({ setActiveStep, setFiles }) {

    const fileInput = useRef();
    const [isDropActive, setIsDropActive] = useState(false);

    function dropAreaActive(event) {
        event.preventDefault();
        setIsDropActive(true);
    }

    function dropAreaInactive(event) {
        event?.preventDefault();
        setIsDropActive(false);
    }

    function handleFilesDrop(event) {
        event.preventDefault();
        dropAreaInactive();
        handleFiles(event.dataTransfer.files);
    }

    function handleDropAreaClicked() {
        fileInput.current.click();
    }

    function handleFiles(files) {debugger
        ReactGA.event({
            category: "pdf datatable",
            action: "select_files"
        });

        setFiles(files);
        setActiveStep('SelectCsvElement');
    }

    return (
        <>
            <div className="alert alert-info" role="alert">
                Select a PDF file
            </div>

            <div className="row justify-content-center">
                <div className="col-12 col-lg-8">

                    <div id="drop-area" className={isDropActive ? 'active' : ''}
                        onDrop={handleFilesDrop}
                        onDragEnter={dropAreaActive}
                        onDragOver={dropAreaActive}
                        onDragLeave={dropAreaInactive}
                        onClick={handleDropAreaClicked}>

                        <p className="icon-link"><img src={pdfIcon} alt="PDF icon" className="logo" /> Drag and drop files here, or click to select files</p>
                        <p>(Files are never uploaded to the server)</p>
                        <input type="file" id="file-input" multiple className="hidden" ref={fileInput} accept=".pdf" onChange={(event) => handleFiles(event.target.files)} />
                    </div>
                </div>
            </div>
        </>
    );
}
