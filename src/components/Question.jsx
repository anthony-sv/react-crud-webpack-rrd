import { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
const Question = ({ id, name }) => {
    const [showModalDelete, setShowModalDelete] = useState(false);

    const handleClose = () => setShowModalDelete(false);
    const handleShow = () => setShowModalDelete(true);
    return (
        <>
            <tr>
                <th>{id}</th>
                <td>{name}</td>
                <td
                    style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                    }}
                >
                    <Button
                        variant="info"
                        onClick={() => (window.location.href = `/read/${id}`)}
                    >
                        Leer pregunta
                        {/* read para esa pregunta */}
                    </Button>
                    <Button
                        variant="warning"
                        onClick={() => (window.location.href = `/update/${id}`)}
                    >
                        Modificar pregunta
                        {/* update para esa pregunta */}
                    </Button>
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
                        action={"http://localhost:8080/CRUD/EliminarPregunta"}
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
