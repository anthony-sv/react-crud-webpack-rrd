import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Create from "./Create";
import ListOfQuestions from "./ListOfQuestions";
import { Container, Navbar, Button } from "react-bootstrap";
import "../styles/App.component.css";
import "../styles/login-style.css";
import Update from "./Update";
import Read from "./Read";
import Login from "./Login";
import Error from "./Error";
import { useState, useEffect } from "react";
import ProbarEjercicio from "./ProbarEjercicio";

const App = () => {

    const [logg, setLogg] = useState(false);
    const [checa, setCheca] = useState(window.localStorage.getItem("APP_USER"));

    useEffect(() => {
        function fetchData() {
            if (checa !== null)
                setLogg(true);
        }

        fetchData();
    });

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/react-crud">ABCC</Navbar.Brand>
                <Navbar.Toggle />
                {logg && (
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            Sesión como: <i>{checa}</i>
                        </Navbar.Text>
                        <Button
                            variant="outline-light"
                            size="sm"
                            className="ml-2"
                            onClick={() => {
                                window.localStorage.removeItem("APP_USER");
                                location.href = "/react-crud";
                            }}
                        >
                            Cerrar Sesión
                        </Button>
                    </Navbar.Collapse>
                )}
            </Navbar>
            <Container className="lista">
                <Router basename="/react-crud">
                    <Switch>
                        <Route exact path="/">
                            {logg ? <Redirect to="/inicio" /> : <Login />}
                        </Route>
                        <Route path="/inicio">
                            {logg ? (
                                <>
                                    <ListOfQuestions />
                                    <Link
                                        className="btn btn-primary"
                                        to="/create"
                                    >
                                        Crear nueva pregunta
                                    </Link>
                                </>
                            ) : (
                                <Redirect to="/" />
                            )}
                        </Route>
                        <Route path="/create">
                            {logg ? <Create /> : <Redirect to="/" />}
                        </Route>
                        <Route path="/update">
                            {logg ? <Update /> : <Redirect to="/" />}
                        </Route>
                        <Route path="/read">
                            {logg ? <Read /> : <Redirect to="/" />}
                        </Route>
                        <Route path="/probar">
                            {logg ? <ProbarEjercicio /> : <Redirect to="/" />}
                        </Route>
                    </Switch>
                </Router>
            </Container>
        </>
    );
};

export default App;
