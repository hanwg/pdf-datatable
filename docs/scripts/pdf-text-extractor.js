/**
 * Asynchronously extracts all text content from a PDF file using PDF.js.
 *
 * @param {string | File} source - The URL of the PDF file or a File object.
 * @returns {Promise<string>} - A promise that resolves with the extracted text content, or rejects with an error.
 */
async function readTextFromPdf(source) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/5.0.375/pdf.worker.min.mjs';

    try {
        let loadingTask = pdfjsLib.getDocument({
            data: await source.arrayBuffer()
        });

        const pdfDocument = await loadingTask.promise;
        let textContent = '';

        // save in global
        window.pdf = {
            pdf: pdfDocument,
            pages: [],
            numPages: pdfDocument.numPages
        };

        // Iterate over each page of the PDF.
        for (let pageNum = 1; pageNum <= pdfDocument.numPages; pageNum++) {
            const page = await pdfDocument.getPage(pageNum);
            const textLayer = await page.getTextContent();

            window.pdf.pages.push(page);
            if (pageNum == 1) {
                document.getElementById("pageContainer").style.boxShadow = '0 4px 6px #77777736';

                render(page);

                // TODO refactor this
                document.getElementById("selectPdf").style.display = 'none';
                document.getElementById("selectHeaders").style.display = 'block';

            }

            // Concatenate the text from each item in the text layer.
            for (const item of textLayer.items) {
                // TODO
                // (item.transform[4] > ... ? '\n' : ' '
                textContent += item.str + ' '; // Add a space between text items.
            }
            textContent += '\n'; // Add a newline after each page's text, for readability
            await page.cleanup(); //release page resources
        }
// TODO await pdfDocument.cleanup(); //release document resources

        return textContent;
    } catch (error) {
        console.error('Error reading PDF:', error);
        throw error; // Re-throw the error to be caught by the caller.
    }
}

async function exampleUsage() {
    const fileInput = document.getElementById('file-input');
    fileInput.type = 'file';
    fileInput.accept = '.pdf';
    fileInput.onchange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                const text = await readTextFromPdf(file);
                console.log('Text from file:', text);
            } catch (err) {
                console.error('Failed to extract text from file', err);
            }
        }
    };
}

async function render(page) {
    const scale = window.devicePixelRatio || 1;
    const viewport = page.getViewport({ scale });

    const container = document.getElementById("pageContainer");
    const eventBus = new pdfjsViewer.EventBus();
    const pdfPageView = new pdfjsViewer.PDFPageView({
        container,
        id: 1, //TODO page number
        scale: scale,
        defaultViewport: viewport,
    eventBus,
    });

    // Associate the actual page with the view, and draw it.
    pdfPageView.setPdfPage(page);
    pdfPageView.draw();
}

exampleUsage();