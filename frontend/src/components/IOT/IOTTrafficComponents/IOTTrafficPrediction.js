import { React, useState, useEffect } from "react";
import { LineChart } from '@mui/x-charts/LineChart';
import axios from 'axios';
import { Container } from "@mui/material";
import Spinner from 'react-bootstrap/Spinner';
import { PiecewiseColorLegend } from "@mui/x-charts/ChartsLegend";
import { ChartsReferenceLine } from "@mui/x-charts/ChartsReferenceLine";
const IOTTrafficPrediction = (props) => {
    // use props.deviceIdNo, pass in deviceIdNo from parent component (e.g. when clicked on in map)
    // const [deviceIdNo, setDeviceIdNo] = useState("402059");
    const [speedPredictionValues, setSpeedPredictionValues] = useState([]);
    const [timestampValues, setTimestampValues] = useState([]);
    const getTrafficPrediction= async () => {
        try {
          const response = await axios.get(`/api/v1/iot/traffic/predictions/${props.deviceIdNo}`); //localhost
          //const response = await axios.get(`/aws/api/v1/iot/traffic/predictions/${props.deviceIdNo}`); //aws 
          const trafficPredictionData = response.data;
          setSpeedPredictionValues(trafficPredictionData.speedPredictionValues);
          const distinctTimestamps = trafficPredictionData.predictionTimestamps.map((timestamp, index) => {return `${index}: ${timestamp}`});
          setTimestampValues(distinctTimestamps);
        } catch (error) {
          console.error("Error getting traffic prediction");
        }
    };

    useEffect(() => {
        getTrafficPrediction();
    }, [props.deviceIdNo])
    return(
        <Container>
            <h5> Traffic Speed Prediction Device ID No. {props.deviceIdNo} </h5>
            {speedPredictionValues === undefined ? 
                <p>Error getting data</p>
                : speedPredictionValues.length === 0 ?
                <Spinner
                    as="span"
                    animation="border"
                    size="lg"
                    role="status"
                    aria-hidden="true"
                /> 
                :
                <LineChart
                    xAxis={[
                        { 
                            data: timestampValues, 
                            scaleType: "point",
                            label: "Timestamp"
                        }
                    ]}
                    yAxis={[
                        {
                            min: 0,
                            label: 'Speed (MPH)',
                            scaleType: 'linear',
                            colorMap: {
                                type: 'piecewise',
                                thresholds: [10,25,60],
                                colors: ['#e60000', '#f07d02', '#ffff00', '#87cb54'],
                            }
                        }
                    ]}
                    series={[
                        {
                            data: speedPredictionValues, 
                            scaleType: "linear",
                            showMark: false,
                            label: "MPH"
                        },
                    ]}
                    width={790}
                    height={500}
                    margin={{ top: 50, right: 20 }}
                    slotProps={{ legend: { hidden: true } }}
                    grid={{ horizontal: true }}
                    >
                    <PiecewiseColorLegend
                        axisDirection="y"
                        position={{ vertical: 'top', horizontal: 'middle' }}
                        direction="row"
                        padding={0}
                        labelStyle={{ fontSize: 25 }}
                    />
                    <ChartsReferenceLine y={0} />
                </LineChart>
            }

        </Container>
    )
}

export default IOTTrafficPrediction;