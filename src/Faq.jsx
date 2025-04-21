import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Faq() {
    return (
        <>
            <Navbar />

            <div className="container">
                <div className="jumbotron">
                    <h1 className="my-5 display-4 text-center">Frequently Asked Questions</h1>

                    <p className="lead">What's the pricing like?</p>
                    <p className="mb-5">PDF DataTable is <strong>free</strong> to use.</p>

                    <p className="lead">Are my files safe?</p>
                    <p className="mb-5"><strong>Yes.</strong> Your files are never uploaded to the server. All processing is done within the browser of your device.</p>

                    <p className="lead">My PDF file has images of tables. Can I convert them to CSV?</p>
                    <p className="mb-5"><strong>No.</strong> Only text content is supported.</p>

                    <p className="lead">What's the system requirements?</p>
                    <p className="mb-5">PDF DataTable has been tested with the latest version of Google <strong>Chrome</strong> on the <strong>desktop</strong>. While there hasn't been any extensive testing on other browsers, it should work on most modern browsers.</p>

                    <p className="lead">I encountered an issue / I have a feature request</p>
                    <p className="mb-5">Please <a href="https://github.com/hanwg/pdf-tables/issues/new" target="_blank" rel="noreferrer">open an issue</a> through the project's GitHub repository.</p>
                </div>
            </div>

            <Footer />
        </>
    );
}