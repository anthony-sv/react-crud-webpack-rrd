import { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
const Question = ({ id, name, ec }) => {
    const [showModalDelete, setShowModalDelete] = useState(false);

    const handleClose = () => setShowModalDelete(false);
    const handleShow = () => setShowModalDelete(true);
    return (
        <>
            <tr>
                <td>{name}</td>
                <td
                    style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                    }}
                >
                    <Link
                        className="btn btn-info"
                        to={`/read?id=${id}`}
                    >
                        Leer pregunta
                    </Link>
                    <Link
                        className="btn btn-warning"
                        to={`/update?id=${id}`}
                    >
                        Modificar Pregunta
                    </Link>
                    <Link
                        className="btn btn-success"
                        to={`/probar?id=${id}`}
                    >
                        Probar ejercicio
                    </Link>
                    <Button variant="danger" onClick={handleShow}>
                        Eliminar pregunta
                    </Button>
                </td>
            </tr>
            <Modal show={showModalDelete} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>¿Deseas continuar?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Vas a borrar la pregunta:
                    <p>{name}</p>
                    <p className="link-danger">
                        No podrás recuperarla después.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <form
                        action={
                            "http://localhost:8080/react-crud/EliminarPregunta"
                        }
                        method="get"
                    >
                        <Form.Control type="hidden" name="id" value={id} />
                        <Button variant="danger" type="submit">
                            Borrar
                        </Button>
                    </form>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Question;
