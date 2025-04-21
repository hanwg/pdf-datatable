import { NavLink } from "react-router-dom";

import githubLogo from './assets/github-mark-white.svg';
import pdfDataTableLogo from './assets/pdf-datatable-logo.png';

export default function Navbar() {

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <NavLink to="/" className="navbar-brand abs home"><img src={pdfDataTableLogo} alt="PDF DataTable logo" /> PDF DataTable</NavLink>

                    <button className="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item px-3">
                                <NavLink to="/start" className="nav-link">Start</NavLink>
                            </li>
                            <li className="nav-item px-3">
                                <NavLink to="/faq" className="nav-link">FAQ</NavLink>
                            </li>
                            <li className="nav-item px-3">
                                <NavLink to="https://github.com/hanwg/pdf-tables" className="nav-link" target="_blank"><img src={githubLogo} className="d-inline-block align-text-top logo" alt="GitHub logo" /> GitHub</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}