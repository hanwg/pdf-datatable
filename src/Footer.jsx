import linkedinLogo from './assets/linkedin-logo.png';

export default function Footer() {
    return (
        <>
            <footer className="footer py-2 bg-dark">
                © 2025 Han Wuguang
                <a href="https://www.linkedin.com/in/hanwuguang/" target="_blank" rel="noreferrer" className="px-3">
                    <img src={linkedinLogo} className="logo" alt="LinkedIn logo" />
                </a>
            </footer>
        </>
    );
}