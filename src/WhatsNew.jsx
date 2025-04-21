import Navbar from "./Navbar";
import Footer from "./Footer";

export default function WhatsNew() {
    return (
        <>
            <title>PDF DataTable | What's new</title>
            <Navbar />

            <div className="container">
                <div className="jumbotron">
                    <h1 className="my-5 display-4 text-center">What's New</h1>

                    <ul class="timeline">
                        <li>
                            <p><strong>Upcoming...</strong></p>
                            <p>Support for password-protected PDFs.</p>
                        </li>
                        <li>
                            <p><strong>21 April, 2025</strong></p>
                            <p>PDF DataTable is live!</p>
                        </li>
                    </ul>
                </div>
            </div>

            <Footer />
        </>
    );
}