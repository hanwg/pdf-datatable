import { Link } from "react-router-dom";

import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Home() {

    return (
        <>
            <Navbar />

            <div className="container-fluid">

                <div className="jumbotron text-center mt-5">
                    <h1 className="display-4">🪄 Transform your PDF into CSV effortlessly</h1>
                    <p className="lead">Having trouble exporting tables from your PDF? This free tool is here to help!</p>

                    <Link to="/start">
                        <button type="button" className="btn btn-lg btn-primary">Get Started</button>
                    </Link>
                </div>

                <hr className="my-4 mt-5"/>

                <div className="row justify-content-evenly">
                    <div className="col-xs-12 col-sm-6 col-md-3">
                        <div className="card-header">
                            <h5>✅ Powerful yet easy to use</h5>
                        </div>
                        <div className="card-title">
                            <p>PDF Tables allow you to select where your data starts on your PDF. Watch real-time previews of your CSV records as you navigate through elements in your PDF.</p>
                        </div>
                    </div>

                    <div className="col-xs-12 col-sm-6 col-md-3">
                        <div className="card-header">
                            <h5>🌐 Free and Open Source Software (FOSS)</h5>
                        </div>
                        <div className="card-title">
                            <p>PDF Tables is free to use!</p>
                        </div>
                    </div>

                    <div className="col-xs-12 col-sm-6 col-md-3">
                        <div className="card-header">
                            <h5>🔒 Security and Privacy focused</h5>
                        </div>
                        <div className="card-title">
                            <p>Files are never uploaded to the server. Everything is done within your device.</p>
                        </div>
                    </div>

                    <div className="col-xs-12 col-sm-6 col-md-3">
                        <div className="card-header">
                            <h5>📃 No file size limit</h5>
                        </div>
                        <div className="card-title">
                            <p>There are no built-in limits. Process files as large as you like as long as your device can handle it.</p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}