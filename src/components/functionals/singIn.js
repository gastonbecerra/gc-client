import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import Axios from "axios";

export default function SignIn() {
    let history = useHistory();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [signinResult, setSigninResult] = useState(false);
    
    const submit = event => {
        event.preventDefault();
        Axios({
            method: "POST",
            data: {
              username: username,
              password: password,
            },
            withCredentials: true,
            url: "/login",
          }) .then((res) => {
            if(res.data === "user-authenticated") history.push('/')
            if(res.data === "wrong-data") setSigninResult('wrong data')
        });
    };

    return (
        <Container className="sign-forms">
            <Row className="justify-content-md-center">
                <Col md="6">
                    <h3>Login</h3>
                    <p>No tienes una cuenta? <Link to={'/signup'}>Regístrate aquí</Link></p>
                    <form onSubmit={submit}>
                    {signinResult ? <p style={{color: 'red', fontWeight: 900}}>{signinResult}</p> : null}
                        <div className="form-item">
                            <label>Nombre de usuario</label>
                            <input 
                                type="text" 
                                onChange={e => setUsername(e.target.value)} 
                            />
                        </div>
                        <div className="form-item">
                            <label>Contraseña</label>
                            <input 
                                type="password" 
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <Button 
                            style={{width: '100%'}}
                            type="submit"
                            variant="primary"
                            disabled={username.length === 0 || password.length === 0}
                        >
                            Login
                        </Button>
                    </form>
                </Col>
            </Row>
        </Container>
    )
}
