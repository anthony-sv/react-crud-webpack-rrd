import React, { useState } from 'react'
import { Container, Form, Card, Button } from 'react-bootstrap'

const Login = () => {

    const [data, setData] = useState({ user: '', pass: '' });

    const handleInputChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <Container fluid className="container_login">
            <div className="tittle_login">
                <h1>Bienvenido</h1>
                <h5>Por favor, inicie sesión en su cuenta</h5>
            </div>
            <Container className="container_login_card">
                <Card></Card>
                <Card>
                    <h1 className="title">Login</h1>
                    <Form >
                        <Form.Group>
                            <Form.Control name="user" id="user" type="text" required="required" onChange={handleInputChange} />
                            <Form.Label>Usuario</Form.Label>
                            <div className="bar"></div>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control name="pass" id="pass" type="password" required onChange={handleInputChange} />
                            <Form.Label>Password</Form.Label>
                            <div className="bar"></div>
                        </Form.Group>
                        <Form.Group className="submit-button">
                            <Button type="submit" ><span>Enviar</span></Button>
                        </Form.Group>
                    </Form>
                </Card>
            </Container>
        </Container>
    )

}

export default Login