import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Form, Container, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");
  const [campus, setCampus] = useState("");
  //const [isAdmin, setIsAdmin] = useState("");
  const [warningText, setWarningText] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    //console.log(email, password);
    /*
    axios
      .post("/user/register", {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        campus: campus,
        role: role,
      })
      .then((response) => {
        console.log(response.data.message);

        //setUser(response.data);
        setWarningText(null);
        //localStorage.setItem("token", response.data.jwt);
        //localStorage.setItem("userID", response.data.userID);
        //localStorage.setItem("isAdmin", response.data.isAdmin);
        //localStorage.setItem("userName", response.data.userName);
        window.location = "/Login";
      })
      .catch((error) => {
        console.log(error);
        setWarningText(
          <Alert variant="danger">
            Account already exist with the email provided
          </Alert>
        );
      });*/
  }

  function handleLogin(event) {
    event.preventDefault();
    window.location = "/login";
  }

  return (
    <div>
      <Container className="py-4">
        {warningText}
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
              Register
            </h1>
          </div>
          <br />
          {warningText}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="d-flex justify-content-start">
                First Name
              </Form.Label>
              <Form.Control
                required
                type="firstName"
                placeholder="Enter first name"
                name="firstName"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                autoFocus
              />
            </Form.Group>
            <br />
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="d-flex justify-content-start">
                Last Name
              </Form.Label>
              <Form.Control
                required
                type="lastName"
                placeholder="Enter last name"
                name="lastName"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                autoFocus
              />
            </Form.Group>
            <br />
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
            <br />
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="d-flex justify-content-start">
                Role
              </Form.Label>
              <Form.Select
                required
                placeholder="Enter role"
                name="role"
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                }}
                aria-label="Default select example"
              >
                <option>Choose Role</option>
                <option value="traffic">Traffic Agent</option>
                <option value="client">City Client</option>
              </Form.Select>
            </Form.Group>
            <br />
            
            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>
          <br />
          
          <Form.Text className="text-muted">
            Already have an account? <a href="/login">Log In</a>
          </Form.Text>
          <br></br>
        </div>
      </Container>
    </div>
  );
};
export default Register;