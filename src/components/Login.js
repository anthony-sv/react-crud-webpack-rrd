import React, { useState } from 'react'
import { Container, Form, Card, Button, Alert } from 'react-bootstrap'
import axios from "axios";

const Login = () => {

    //Estado que almacena el usuario y contraseña ingersado por el cliente
    const [data, setData] = useState({ user: '', pass: '' });
    //Estado que habilita el mensaje de error
    const [show, setShow] = useState(false);

    //Funcion que guarda cada cambio del valor del input
    const handleInputChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value,
        });
    };

    //Funcion que previene la actualiazcion de pantalla debido al boton submit
    const handleSubmit = (e) => {

        e.preventDefault();

    }

    //Funcion que hace la peticion al servlet para verificar los valores ingresados por el usuario
    const handleEnviar = async () => {
        const result = await axios(
            "http://localhost:8080/react-crud/Login?user=" + data.user + "&pass=" + data.pass
        );
        //Se comprueba el estado del JSON obtenido por la peticion, si el estado es 200 es porque se encontró el usuario ingresado
        if (result.data.state === 200) {
            //Se guarda el usuario en el localStorage y se redirecciona a home
            window.localStorage.setItem("APP_USER", JSON.stringify(data.user))
            location.href = "/react-crud";
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
                                        Revisa cuidadosamente el usuario y contraseña ingresados, al parecer
                                        uno de los dos no está bien escrito o no está registrado el usuario.
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