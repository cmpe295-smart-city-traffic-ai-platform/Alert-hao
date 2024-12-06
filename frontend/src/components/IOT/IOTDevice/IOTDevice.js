import { React, useState } from "react";
import CircleIcon from '@mui/icons-material/Circle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import axios from 'axios';
import Image from 'react-bootstrap/Image';

import iotImage from "../../../images/iotImage.png";


// modal reference: https://react-bootstrap.netlify.app/docs/components/modal
const IOTDevice = (props) => {
    const [show, setShowModal] = useState(false);
    const [updatedDeviceName, setUpdatedDeviceName] = useState(null);
    const [updatedDeviceLocation, setUpdatedDeviceLocation] = useState(null);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [successMessage, setSuccessMessage] = useState("IoT Device Deleted Successfully")
    const [errorMessage, setErrorMessage] = useState("")

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const toggleActiveStatus = async () => {
        try {
            const response = await axios.put(`/api/v1/iot/${props.userId}/${props.deviceId}`, {
                active: !props.active,
                name: null,
                location: null
            });
            setSuccessMessage("IoT status updated successfully");
            setShowSuccessAlert(true);
            // refresh devices after updates
            props.getDevices();
        } catch (error) {
            console.error(`"Error updating active status: ${error.respone.data.errorMessage}`);
            setErrorMessage("Error updating device status");
            setShowErrorAlert(true);
        }
    }

    const updateDevice = async () => {
        try {
            const response = await axios.put(`/api/v1/iot/${props.userId}/${props.deviceId}`, {
                active: null,
                name: updatedDeviceName,
                location: updatedDeviceLocation
            });
            setSuccessMessage(`IoT Device Updated Successfully`)
            setShowSuccessAlert(true)
            // refresh devices after updates
            props.getDevices();
        } catch (error) {
            console.error(`Error updating device: ${error.response.data.errorMessage}`);
            setErrorMessage("Error updating device");
            setShowErrorAlert(true);
        }
        handleClose();
    }

    const deleteIotDevice = async () => {
        try {
            await axios.delete(`/api/v1/iot/${props.userId}/${props.deviceId}`);
            setSuccessMessage(`IoT Device Deleted Successfully`)
            // refresh devices after updates
            props.getDevices();
        } catch (error) {
            console.error(`Error deleting IoT device: ${error}`);
            setErrorMessage("Error deleting IoT device");
            setShowErrorAlert(true);
        }
        handleClose();
    }

    const handleDeviceNameChange = (event) => {
        setUpdatedDeviceName(event.target.value);
    };

    const handleDeviceLocationChange = (event) => {
        setUpdatedDeviceLocation(event.target.value);
    };

    return(
        <>
            <tr>
                <td><Image src={iotImage} width={50} height={50} roundedCircle/> </td>
                <td>{props.deviceId}</td>
                <td>{props.name}</td>
                <td>{props.location}</td>
                <td>{props.createdAt}</td>
                <td>{props.updatedAt}</td>
                <td>{props.active ? <CircleIcon sx={{color: "green", cursor: "pointer"}} onClick={toggleActiveStatus}/> : <CircleIcon sx={{color: "red" , cursor: "pointer"}} onClick={toggleActiveStatus}/>}</td>
                <td><EditIcon onClick={handleShow} sx={{cursor: "pointer"}}/></td>
                <td><DeleteIcon sx={{cursor: "pointer"}} onClick={deleteIotDevice}/></td>
            </tr>

            <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update IoT Device</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="name.ControlInput1">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter new device name"
                            autoFocus
                            onChange={handleDeviceNameChange}
                        />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="location.ControlInput2"
                    >
                        <Form.Label> Location <LocationOnIcon/> </Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="(e.g. 37.417981,-121.972547)" 
                            autoFocus 
                            onChange={handleDeviceLocationChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                Close
                </Button>
                <Button variant="primary" onClick={updateDevice}>
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
        </>
    )
}

export default IOTDevice;