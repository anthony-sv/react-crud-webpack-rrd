import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Create from "./Create";
import ListOfQuestions from "./ListOfQuestions";
import { Container, Navbar } from "react-bootstrap";
import "../styles/App.component.css";
import Update from "./Update";
import Read from "./Read";

const App = () => {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/react-crud">ABCC</Navbar.Brand>
            </Navbar>
            <Container className="lista">
                <Router basename="/react-crud">
                    <Switch>
                        <Route exact path="/create">
                            <Create />
                        </Route>
                        <Route exact path="/">
                            <ListOfQuestions />
                            <Link className="btn btn-primary" to="/create">
                                Crear nueva pregunta
                            </Link>
                        </Route>
                        <Route exact path="/update">
                            <Update />
                        </Route>
                        <Route exact path="/read">
                            <Read />
                        </Route>
                    </Switch>
                </Router>
            </Container>
        </>
    );
};

export default App;
