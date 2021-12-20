import "./App.css";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Route, Routes } from "react-router-dom";
import All from "./components/All";
import Edit from "./components/Edit";
import Add from "./components/Add";
import Button from "react-bootstrap/Button";

function App() {
  return (
    <div className="App">
      <nav>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="/">EzMarket</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/add">Add Food Item</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </nav>
      <Routes>
        <Route path="/" element={<All />} />
        <Route path="/items/:id" element={<Edit />} />
        <Route path="/add" element={<Add />} />
      </Routes>
    </div>
  );
}

export default App;
