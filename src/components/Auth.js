import 'firebase/auth'
import { useFirebaseApp } from 'reactfire'
import React, { useState } from 'react';
import fireB from "firebase/app";
import { 
    Button,
    Card,
    Row,
    Col,
    Form,
} from 'react-bootstrap';
import Alert from './Alert';
import { message } from 'antd';



export default (props) => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const firebase = useFirebaseApp();
    const facebookAuthProvider = new fireB.auth.FacebookAuthProvider();
    const googleAuthProvider = new fireB.auth.GoogleAuthProvider();

    const signIn = async () => {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
    }

    const login = async () => {
        await firebase.auth().signInWithEmailAndPassword(email, password)
        .catch(error => alert(error))
    }

    const socialLogin = async (provider) => {
        await firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.log(error.message)
        });
    }

    return (
        <div>
            <Row>
                <Col>
                    <Card style={{ width: '18rem' }}>
                    <Card.Header>
                        <p className="card-category">Please login or signIn</p>
                        </Card.Header>
                        <Card.Body>
                            <div>
                                <Row>
                                    <Form>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="email" placeholder="Enter email" id='mail' onChange={ (e) => setEmail(e.target.value) } />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Password" id='password' onChange={ (e) => setPassword(e.target.value) } />
                                    </Form.Group>
                                    <Button variant="info" onClick={signIn}>sign in</Button>
                                    <Button onClick={login}>Login</Button>
                                    </Form>
                                </Row>
                                OR
                                <Row>
                                    <Button
                                        variant="primary"
                                        className=""
                                        onClick={() => socialLogin(facebookAuthProvider)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20"  viewBox="0 0 14222 14222"><circle cx="7111" cy="7112" r="7111" fill="#1977f3"/><path d="M9879 9168l315-2056H8222V5778c0-562 275-1111 1159-1111h897V2917s-814-139-1592-139c-1624 0-2686 984-2686 2767v1567H4194v2056h1806v4969c362 57 733 86 1111 86s749-30 1111-86V9168z" fill="#fff"/></svg>
                                        Facebook
                                    </Button>
                                </Row>
                                <Row>
                                    <Button
                                        variant=""
                                        className=""
                                        onClick={() => socialLogin(googleAuthProvider)}
                                    >
                                        <img style={{width: '20px'}} src="https://e7.pngegg.com/pngimages/543/934/png-clipart-google-app-logo-google-logo-g-suite-google-text-logo.png" />
                                        Google
                                    </Button>
                                </Row>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}