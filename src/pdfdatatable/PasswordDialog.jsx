import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function PasswordDialog({ isVisible, setIsVisible, setPassword, isPasswordValid }) {

    const [response, setResponse] = useState("");

    function submitPassword() {
        const newPassword = response;
        setResponse("");
        setPassword(newPassword);

        setIsVisible(false);
    }

    return (
        <>
            <Modal backdrop="static" onHide={() => {
                    setResponse("");
                    setIsVisible(false);
                    setPassword(null);
                }} show={isVisible}>
                <Modal.Header closeButton>
                    <Modal.Title>🔒 PDF is password-protected</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="form-group">
                        <label htmlFor="password" className="col-form-label">Enter password:</label>
                        <input type="password" id="password" className={isPasswordValid ? "form-control" : "form-control is-invalid"}
                            onChange={event => setResponse(event.target.value)}
                            onKeyDown={event => {
                                    if (event.key === "Enter")
                                        submitPassword();
                                    }}
                            autoFocus />
                        <div className="invalid-feedback">
                            Wrong password
                        </div>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={submitPassword}>Unlock</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}