import React, { useState } from 'react'
import { Container, Form, Card, Button, Alert } from 'react-bootstrap'
import axios from "axios";

const Login = () => {

    const [data, setData] = useState({ user: '', pass: '' });
    const [show, setShow] = useState(false);

    const handleInputChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (e) => {

        e.preventDefault();

    }

    const handleEnviar = async () => {
        const result = await axios(
            "http://localhost:8080/react-crud/Login?user=" + data.user + "&pass=" + data.pass
        );
        if (result.data.state === 200) {
            window.localStorage.setItem("APP_USER", JSON.stringify(data.user))
            location.reload();
            setShow(false);
        } else {
            setShow(true);
        }
    }

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
                    <Form onSubmit={handleSubmit}>
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
                        <Container className="mt-3">
                            {
                                show == true &&
                                <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                                    <Alert.Heading>Oh no, al parecer hay un error! </Alert.Heading>
                                    <p>
                                        Revisa cuidadosamente el ususario y contraseña ingresados, al parecer
                                        uno de los dos no está bien escrito o no esta registrado el usuario.
                                    </p>
                                </Alert>
                            }
                        </Container>
                        <Form.Group className="submit-button">
                            <Button type="submit" onClick={handleEnviar}><span>Enviar</span></Button>
                        </Form.Group>
                    </Form>
                </Card>
            </Container>
        </Container>
    )

}

export default Login