import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import Axios from "axios";
const PASSWORD_MIN_LENGTH = 4;

export default function SignUp() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [validPassword, setValidPassword] = useState(false);
    const [signupResponse, setSignupResponse ] = useState(false);
    
    let history = useHistory();
    
    const submit = (e) => {
        e.preventDefault();
        Axios({
          method: "POST",
          data: {
            username: username,
            password: password,
          },
          withCredentials: true,
          url: "/register",
        })
        .then((res) => {
            if(res.data === "user-registered") history.push('/signin')
            if(res.data === "user-already-registered") setSignupResponse('user-already-registered')
        });
      };

    useEffect(() => {
        setValidPassword(password.length >= PASSWORD_MIN_LENGTH);
    }, [password])

    useEffect(() => {
        setPasswordsMatch(password === repeatPassword);
    }, [password, repeatPassword])

    return (
        <Container className="sign-forms">
            <Row className="justify-content-md-center">
                <Col md="6">
                    <h3>Sign up</h3>
                    {signupResponse ? <p style={{color: 'red', fontWeight: 900}}>{signupResponse}</p> : null}
                    <form onSubmit={(e)=>submit(e)}>
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
                            <small>Debe contener al menos {PASSWORD_MIN_LENGTH} caracteres</small>
                        </div>
                        <div className="form-item">
                            <label>Repetir contraseña</label>
                            <input 
                                type="password" 
                                onChange={e => setRepeatPassword(e.target.value)}
                            />
                            {!passwordsMatch && <small className="error-text">Las contraseñas no coinciden</small>}
                        </div>
                        
                        
                        <Button
                            style={{width: '100%'}}
                            type="submit"
                            variant="primary" 
                            disabled={username.length === 0 || !validPassword || !passwordsMatch}
                        >
                            Crear
                        </Button>
                        
                    </form>
                </Col>
            </Row>
        </Container>
    )
}