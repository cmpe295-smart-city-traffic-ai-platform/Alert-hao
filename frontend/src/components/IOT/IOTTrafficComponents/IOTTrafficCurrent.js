import { React, useState, useEffect } from "react";
import axios from 'axios';
import { Container } from "@mui/material";
import Spinner from 'react-bootstrap/Spinner';
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

const IOTTrafficCurrent = (props) => {
    // use props.deviceId, pass in deviceId parent component (e.g. when clicked on in map)
    //const [deviceId, setDeviceId] = useState("b1a79cb2-dfb8-4680-9ebb-3604fd37db85");
    const [currentSpeed, setCurrentSpeed] = useState(0);
    
    const getCurrentTraffic = async () => {
        try {
          const response = await axios.get(`/api/v1/iot/traffic/${props.deviceId}`); //localhost
          //const response = await axios.get(`/aws/api/v1/iot/traffic/${props.deviceId}`);//aws
          const trafficResults = JSON.parse(response.data.trafficData);
          setCurrentSpeed(trafficResults.flowSegmentData.currentSpeed);
        } catch (error) {
          console.error("Error getting current traffic data for selected device");
        }
    };

    useEffect(() => {
        getCurrentTraffic();
    }, [props.deviceId])

    const getSpeedColor = (speed) => {
        if(speed >= 0 && speed <= 10) return '#e60000';//severe traffic red
        if(speed > 10 && speed <= 25) return '#f07d02'//normal traffic orange
        if(speed > 25 && speed <= 60) return '#ffff00';//light traffic yellow
        return '#87cb54' //no traffic green
    }
    return(
        <Container>
            {currentSpeed !== null ?   
                <Stack direction="row" spacing={1}>     
                        <Avatar
                            sx={{
                                bgcolor: getSpeedColor(currentSpeed),
                                color: '#333333'  //Speed number color black
                            }}
                            alt="Current Speed Avatar"
                        >
                            {currentSpeed}
                        </Avatar> 
                    <b>MPH</b>
                </Stack>
            :      
                <Spinner
                as="span"
                animation="border"
                size="lg"
                role="status"
                aria-hidden="true"
            />        
                
        }

        </Container>

    )
}

export default IOTTrafficCurrent;