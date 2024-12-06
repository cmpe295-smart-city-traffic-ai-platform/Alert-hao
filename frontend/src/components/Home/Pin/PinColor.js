import { React, useState, useEffect } from "react";
import axios from 'axios';
import { Container } from "@mui/material";
import Spinner from 'react-bootstrap/Spinner';
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { Pin } from "@vis.gl/react-google-maps";
import iotImage from "../../../images/iotImage.png";
import cctvImage from "../../../images/cctvImage.png";
import droneImage3 from "../../../images/droneImage3.png";
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import Image from 'react-bootstrap/Image';

const PinColor = (props) => {
    const [currentSpeed, setCurrentSpeed] = useState(0);
    const getCurrentTraffic = async () => {
        try {
          const response = await axios.get(`/api/v1/iot/traffic/${props.deviceId}`);//localhost
          //const response = await axios.get(`/aws/api/v1/iot/traffic/${props.deviceId}`);//AWS 
          const trafficResults = JSON.parse(response.data.trafficData);
          setCurrentSpeed(trafficResults.flowSegmentData.currentSpeed);
        } catch (error) {
          console.error("Error getting current traffic data for selected device");
        }
    };
    useEffect(() => {
        getCurrentTraffic();
    }, [props.deviceId, props.type])

    const getSpeedColor = (speed) => {
        if(speed >= 0 && speed <= 10) return '#e60000';//severe traffic red
        if(speed > 10 && speed <= 25) return '#f07d02'//normal traffic orange
        if(speed > 25 && speed <= 60) return '#ffff00';//light traffic yellow
        return '#87cb54' //no traffic green
    }
    const getImage = (type) => {
        if(type === 'a') return iotImage;
        if(type === 'b') return cctvImage;
        if(type === 'c') return droneImage3;
        return WarningAmberRoundedIcon;
    }

    if(props.type === 'a'){
        return(
            <Pin
                background= {props.active.toString() === "true" ? (getSpeedColor(currentSpeed)) : ("#6F7378")}
                glyphColor={"#000"}
                borderColor={"#000"}
                scale={1.3}
            >
                <Image src={getImage(props.type)} width={25} height={25} roundedCircle/>
            </Pin>
    
        )
    }else {
        return(
            <Pin
                background= {props.active.toString() === "true" ? ("#03AC13") : ("#6F7378")}
                glyphColor={"#000"}
                borderColor={"#000"}
                scale={1.3}
            >
                {props.type !== 'd' ? <Image src={getImage(props.type)} width={25} height={25} roundedCircle/> : <WarningAmberRoundedIcon/>}
            </Pin>
        )
    }
}

export default PinColor;