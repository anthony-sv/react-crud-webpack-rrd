import React from 'react'
import { Container } from 'react-bootstrap'

const Error = (props) => {

    return (
        <Container fluid>
            <h1>La página tiene un mensaje para ti</h1>
            <h2>Error {props.status}</h2>
            <h3>{props.mensaje}</h3>
        </Container>
    )

}

export default Error