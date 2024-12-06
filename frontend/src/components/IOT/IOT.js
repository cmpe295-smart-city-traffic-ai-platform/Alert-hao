import { React, useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import AddIcon from '@mui/icons-material/Add';
import IOTDevice from "./IOTDevice/IOTDevice";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Col from "react-bootstrap/esm/Col";
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Image from 'react-bootstrap/Image';
import axios from "axios";

import iotImage from "../../images/iotImage.png";

// modal reference: https://react-bootstrap.netlify.app/docs/components/modal
const IOT = () => {
    const [show, setShow] = useState(false);
    const [iotDevices, setIotDevices] = useState([]);
    // TODO user id is based on logged in user
    const [userId, setUserId] = useState("d04b59ff-4baf-47e2-986b-7a7d3e73091e");

    const [deviceName, setDeviceName] = useState("");
    const [deviceLocation, setDeviceLocation] = useState("");
    const [deviceActive, setDeviceActive] = useState(true);

    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const handleDeviceNameChange = (event) => {
        setDeviceName(event.target.value);
    };

    const handleDeviceLocationChange = (event) => {
        setDeviceLocation(event.target.value);
    };

    const handleDeviceActiveChange = () => {
        setDeviceActive(!deviceActive);
    };

    // modal methods
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getDevices = async () => {
        try {
          const response = await axios.get("/api/v1/iot", {
            params: {
              userId: userId,
            },
          });
          const iotDevices = response.data;
          setIotDevices(iotDevices);
        } catch (error) {
          console.error("Error getting the IoT Devices");
        }
    };

    const createIotDevice = async () => {
        try {
            const response = await axios.post("/api/v1/iot", {
                name: deviceName,
                location: deviceLocation,
                userId: userId,
                active: deviceActive
            });
            const createdIotDevice = response.data;
            console.log("Created device: " + createdIotDevice);
            setSuccessMessage("Device created successfully");
            setShowSuccessAlert(true)
            handleClose();
            getDevices();
          } catch (error) {
            console.error(`Error creating IoT device: ${error}`);
            setErrorMessage("Error creating IoT device")
            setShowErrorAlert(true);
          }
    }


    // load in user iot devices
    useEffect(() => {
        getDevices();
    },[]);

    const dateFormatter = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    return (
        <Container fluid="lg">
            <Row className="mt-3 mb-3">
                <Col align="left">
                    <h2> IoT Station Management</h2>
                    <Image src={iotImage} roundedCircle width={100} height={100}/> 
                </Col>
            </Row>
            
            <Row className="mt-3 mb-3">
                <Col align="left">
                    <Button variant="success" onClick={handleShow}><AddIcon/>Create IoT Device</Button>
                </Col>
            </Row>

            <Row className="mt-3 mb-3">
                <Col>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>IoT</th>
                                <th>Device ID</th>
                                <th>Name</th>
                                <th>Location</th>
                                <th>Created At</th>
                                <th>Updated At</th>
                                <th>Active</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {iotDevices.map((device) => {
                                return <IOTDevice 
                                    key={device.id}
                                    deviceId={device.id} 
                                    name={device.name}
                                    location={device.location}
                                    createdAt={dateFormatter.format(new Date(device.createdAt))}
                                    updatedAt={dateFormatter.format(new Date(device.updatedAt))}
                                    active={device.active}
                                    userId={userId}
                                    getDevices={getDevices}
                                />
                            })}
                        </tbody>
                    </Table>
                </Col>
            </Row>

            <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create IOT Device</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="name.ControlInput1">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Device name"
                            autoFocus
                            onChange={handleDeviceNameChange}
                        />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="location.ControlInput2"
                    >
                        <Form.Label>Location </Form.Label> <LocationOnIcon/> 
                        <Form.Control 
                            type="text" 
                            placeholder="(e.g. 37.417981,-121.972547)" 
                            autoFocus
                            onChange={handleDeviceLocationChange} 
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Check
                            type="checkbox"
                            label="Active"
                            onChange={handleDeviceActiveChange}
                            checked={deviceActive}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                Close
                </Button>
                <Button variant="primary" onClick={createIotDevice}>
                Save Changes
                </Button>
            </Modal.Footer>
            </Modal>

            <ToastContainer position="bottom-end">
                <Toast className="m-3 text-white" bg="success" onClose={() => setShowSuccessAlert(false)} show={showSuccessAlert} delay={3000} autohide>
                    {successMessage}
                </Toast>
            </ToastContainer>

            <ToastContainer position="bottom-end">
                <Toast className="m-3 text-white" bg="danger" onClose={() => setShowErrorAlert(false)} show={showErrorAlert} delay={3000} autohide>
                    {errorMessage}
                </Toast>
            </ToastContainer>
        </Container>
    )
}

export default IOT;