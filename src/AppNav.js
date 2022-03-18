import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

function AppNav(props) {
    return (
        <Navbar className="mb-3" bg="light" variant="light">
            <Container>
                <Navbar.Brand>Harvest Food Pantry Registry</Navbar.Brand>
            </Container>
        </Navbar>
    );
}

export default AppNav;