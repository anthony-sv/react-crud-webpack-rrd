import { Container, Image } from 'react-bootstrap'

function MostrarMultimedia({ hint }) {
    return (
        <Container>
            <Image src={hint} alt="" />
        </Container>
    )
}

export default MostrarMultimedia
