import linkedinLogo from './assets/linkedin-logo.png';

export default function Footer() {
    return (
        <>
            <footer className="footer py-3 bg-dark">
                    <div className="px-3 d-flex justify-content-between">
                        <div>© 2025 Han Wuguang</div>
                        <div><a href="https://www.linkedin.com/in/hanwuguang/" target="_blank" rel="noreferrer"><img src={linkedinLogo} className="logo" alt="LinkedIn logo" /></a></div>
                    </div>
            </footer>
        </>
    );
}