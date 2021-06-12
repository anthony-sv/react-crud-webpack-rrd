import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Create from "./Create";
import ListOfQuestions from "./ListOfQuestions";
import { Container, Navbar } from "react-bootstrap";
import "../styles/App.component.css";
import "../styles/login-style.css";
import Update from "./Update";
import Read from "./Read";
import Login from "./Login";
import Error from "./Error";

const App = () => {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/react-crud">ABCC</Navbar.Brand>
                {
                    window.localStorage.getItem("APP_USER") !== null &&
                    <>
                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text>
                                Sesión iniciada como: <p>{window.localStorage.getItem("APP_USER")}</p>
                            </Navbar.Text>
                        </Navbar.Collapse>
                    </>
                }
            </Navbar>
            <Container className="lista">
                <Router basename="/react-crud">
                    <Switch>
                        <Route exact path="/create">
                            <Create />
                        </Route>
                        <Route exact path="/">
                            <Login />
                        </Route>
                        <Route exact path="/home">
                            {
                                window.localStorage.getItem("APP_USER") !== null ? (
                                    <>
                                        <ListOfQuestions />
                                        <Link className="btn btn-primary" to="/create">
                                            Crear nueva pregunta
                                        </Link>
                                    </>
                                ) : <Error status="500" mensaje="Inicia sesion primero" />
                            }
                        </Route>
                        <Route path="/update">
                            {
                                window.localStorage.getItem("APP_USER") !== null ? <Update /> : <Error status="500" mensaje="Inicia sesion primero" />
                            }
                        </Route>
                        <Route path="/read">
                            {
                                window.localStorage.getItem("APP_USER") !== null ? <Read /> : <Error status="500" mensaje="Inicia sesion primero" />
                            }
                        </Route>
                    </Switch>
                </Router>
            </Container>
        </>
    );
};

export default App;
