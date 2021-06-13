import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Create from "./Create";
import ListOfQuestions from "./ListOfQuestions";
import { Container, Navbar } from "react-bootstrap";
import "../styles/App.component.css";
import "../styles/login-style.css";
import Update from "./Update";
import Read from "./Read";
import Login from "./Login";
import Error from "./Error";
import { useState, useEffect } from "react";

const App = () => {

    const [logg, setLogg] = useState(false);
    const [checa, setCheca] = useState(window.localStorage.getItem("APP_USER"));

    useEffect(() => {
        function fetchData() {
            if (checa !== null)
                setLogg(true);
        }

        fetchData();
    }, []);

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/react-crud">ABCC</Navbar.Brand>
            </Navbar>
            <Container className="lista">
                <Router basename="/react-crud">
                    <Switch>
                        <Route exact path="/">
                            {logg ? <Redirect to="/inicio" /> : <Login />}
                        </Route>
                        <Route path="/inicio">
                            <>
                                <ListOfQuestions />
                                <Link className="btn btn-primary" to="/create">
                                    Crear nueva pregunta
                                </Link>
                            </>
                        </Route>
                        <Route path="/create">
                            <Create />
                        </Route>
                        <Route path="/update">
                            <Update />
                        </Route>
                        <Route path="/read">
                            <Read />
                        </Route>
                    </Switch>
                </Router>
            </Container>
        </>
    );
};

export default App;
