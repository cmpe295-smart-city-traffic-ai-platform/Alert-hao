import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Form, Container, Alert, Row, Col } from "react-bootstrap";

import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState([]);
  const [warningText, setWarningText] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(email, password);

    if(email==="traffic@gmail.com" && password==="traffic"){
        localStorage.setItem("email", "traffic@gmail.com");
        localStorage.setItem("role", "traffic");
        localStorage.setItem("password", password);
        localStorage.setItem("lastName", "Doe");
        localStorage.setItem("firstName", "Jane");
        localStorage.setItem("user_id", "d04b59ff-4baf-47e2-986b-7a7d3e73091e");
        window.location = "/";
    }else if(email==="client@gmail.com" && password==="client"){
        localStorage.setItem("email", "client@gmail.com");
        localStorage.setItem("role", "client");
        localStorage.setItem("password", password);
        localStorage.setItem("lastName", "Doe");
        localStorage.setItem("firstName", "John");
        localStorage.setItem("user_id", "e17c8a2d-5c3b-4f1a-9b6d-8c8d4f8a2b1e")
        window.location = "/";
    }
    else{
        setWarningText(
            <Alert variant="danger">Wrong email and password combination</Alert>
          );
    }
    
    /* Endpoint to login
    axios
      .post("/user/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        setUser(response.data);
        console.log(response.data[0].firstName);
        setWarningText(null);
        
        localStorage.setItem("email", response.data[0].email);
        localStorage.setItem("role", response.data[0].role);
        localStorage.setItem("lName", response.data[0].lastName);
        localStorage.setItem("fName", response.data[0].firstName);
        localStorage.setItem("user_id", "e17c8a2d-5c3b-4f1a-9b6d-8c8d4f8a2b1e")
        window.location = "/";
      })
      .catch((error) => {
        console.log(error);
        setWarningText(
          <Alert variant="danger">Wrong email and password combination</Alert>
        );
      }); */
  }
  //console.log(user);
  function handleRegistration(event) {
    event.preventDefault();
    window.location = "/register";
  }

  return (
    <div>
      <Container className="py-4">
        <div
          className="mx-auto mb24 p24 wmx3 bg-white bar-lg bs-xl mb24"
          style={{ width: "40%" }}
        >
          <br />
          <div>
            <h1
              className="ta-center fs-title mx-auto"
              style={{ textAlign: "center" }}
            >
              Login
            </h1>
          </div>
          <br />
          {warningText}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="d-flex justify-content-start">
                Email address
              </Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Enter email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                autoFocus
              />
            </Form.Group>
            <br />
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="d-flex justify-content-start">
                Password
              </Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Log In
            </Button>
          </Form>
          <br />
          <br></br>
          <Form.Text className="text-muted">
            Dont have an account? <a href="/register">Sign Up</a>
          </Form.Text>
          <br></br>
          <br></br>
        </div>
      </Container>
    </div>
  );
};
export default Login;