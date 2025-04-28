import { Link } from "react-router-dom";

import demo from './assets/demo.mp4';

import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Home() {

    return (
        <>
            <title>PDF DataTable</title>
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
                    <div className="border rounded shadow p-3 m-3 col-xs-12 col-sm-6 col-md-6">
                        <div className="card-header">
                            <h5>✨ Powerful yet easy to use</h5>
                        </div>
                        <div className="card-title">
                            <p>PDF DataTable allows you to select where your data starts on your PDF. Watch real-time previews of your CSV records as you navigate through elements in your PDF.</p>
                        </div>
                    </div>

                    <div className="border rounded shadow p-3 m-3 col-xs-12 col-sm-6 col-md-6">
                        <div className="card-header">
                            <h5>🌐 Free and Open-Source Software (FOSS)</h5>
                        </div>
                        <div className="card-title">
                            <p>Take control of your tools. Being FOSS means you have the freedom to adapt and share.</p>
                        </div>
                    </div>

                    <div className="border rounded shadow p-3 m-3 col-xs-12 col-sm-6 col-md-6">
                        <div className="card-header">
                            <h5>🛡️ Privacy and security</h5>
                        </div>
                        <div className="card-title">
                            <p>Keep your data private and secure. We never upload or store your files, and your passwords stay on your device.</p>
                        </div>
                    </div>

                    <div className="border rounded shadow p-3 m-3 col-xs-12 col-sm-6 col-md-6">
                        <div className="card-header">
                            <h5>🔒 Works with password-protected PDFs</h5>
                        </div>
                        <div className="card-title">
                            <p>Don't let locked PDFs stop you. PDF DataTable has built-in support for password-protected PDFs.</p>
                        </div>
                    </div>

                    <div className="border rounded shadow p-3 m-3 col-xs-12 col-sm-6 col-md-6">
                        <div className="card-header">
                            <h5>📃 No file size limits</h5>
                        </div>
                        <div className="card-title">
                            <p>Go big! PDF DataTable offers flexibility to process even your largest files with ease.</p>
                        </div>
                    </div>

                    <div className="border rounded shadow p-3 m-3 col-xs-12 col-sm-6 col-md-6">
                        <div className="card-header">
                            <h5>⚡ No queues or wait times</h5>
                        </div>
                        <div className="card-title">
                            <p>Enjoy a smooth and uninterrupted experience. No queues, no delays – just instant access whenever you need it.</p>
                        </div>
                    </div>
                </div>
            </div>

            <hr className="my-4 mt-5"/>

            <div className="jumbotron text-center d-none d-lg-block mt-5">
                <h4 id="demo">Demo</h4>
                <div>Convert a PDF statement of account to CSV within minutes!</div>
                <div className="embed-responsive embed-responsive-16by9">
                    <video className="embed-responsive-item border border-dark" loop="true" autoplay="autoplay" controls muted>
                        <source src={demo} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>

            <Footer />
        </>
    );
}