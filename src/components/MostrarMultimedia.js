import { Container, Image } from 'react-bootstrap'

function MostrarMultimedia({ hint }) {
    return (
        <Container className="text-center mt-3">
            <Image src={hint} style={{ width: "40vh", }} alt={hint} />
        </Container>
    )
}

export default MostrarMultimedia
