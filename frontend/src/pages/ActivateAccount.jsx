import React, { useEffect } from 'react'
import { Card, Container } from 'react-bootstrap'
import Button from '../components/ui/Button'

import '../styles/ActivateAccount.css';

const ActivateAccount = () => {
    useEffect(() => {
        const inputs = document.querySelectorAll('#otp > input');

        const handleKeyDown = (event, i) => {
            if (event.key === "Backspace") {
                inputs[i].value = '';
                if (i !== 0) inputs[i - 1].focus();
            } else {
                if (i === inputs.length - 1 && inputs[i].value !== '') {
                    return true;
                } else if (event.keyCode > 47 && event.keyCode < 58) {
                    inputs[i].value = event.key;
                    if (i !== inputs.length - 1) inputs[i + 1].focus();
                    event.preventDefault();
                } else if (event.keyCode > 64 && event.keyCode < 91) {
                    inputs[i].value = String.fromCharCode(event.keyCode);
                    if (i !== inputs.length - 1) inputs[i + 1].focus();
                    event.preventDefault();
                }
            }
        };

        inputs.forEach((input, i) => {
            input.addEventListener('keydown', (event) => handleKeyDown(event, i));
        });

        return () => {
            inputs.forEach((input, i) => {
                input.removeEventListener('keydown', (event) => handleKeyDown(event, i));
            });
        };
    }, []);

    const handleActivate = () => {
        // Access the input otp
    }

    return (
        <Container className='d-flex justify-content-center align-items-center vh-100'>
            <Card>
                <Card.Header className='d-flex gap-3 justify-content-center align-items-center flex-column'>
                    <div className="border p-3 d-flex justify-content-center align-items-center" style={{ width: "100px", height: "100px", borderRadius: "50%" }}>
                        <img
                            src='/taskify-logo.png'
                            alt='logo-img'
                            className='h-100 p-1'
                        />
                    </div>
                         <Card.Title>TASKIFY SOFTWARE</Card.Title>
                </Card.Header>
                <Card.Body>
                    <div class="container d-flex justify-content-center align-items-center">
                        <div class="position-rela tive"> <div class="  p-2 text-center">
                            <h6>Please enter the one time password <br /> to activate your account</h6>
                            <div>
                                <span>A code has been sent to</span>
                                <small>*******9897</small> </div>
                            <div id="otp" class="inputs d-flex flex-row justify-content-center mt-2">
                                <input class="m-2 text-center form-control rounded" type="number" id="first" maxlength="1" />
                                <input class="m-2 text-center form-control rounded" type="number" id="second" maxlength="1" />
                                <input class="m-2 text-center form-control rounded" type="number" id="third" maxlength="1" />
                                <input class="m-2 text-center form-control rounded" type="number" id="fourth" maxlength="1" />
                                <input class="m-2 text-center form-control rounded" type="number" id="fifth" maxlength="1" />
                                <input class="m-2 text-center form-control rounded" type="number" id="sixth" maxlength="1" />
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className='d-flex justify-content-center my-3'>
                    <Button variant="primary" handleClick={handleActivate}>Verify</Button>

                    </div>
                    <div class="my-4">
                        <div class="content d-flex gap-2 justify-content-center align-items-center">
                            <p>Didn't get the code</p>
                            <p className='text-primary' >Resend</p>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default ActivateAccount