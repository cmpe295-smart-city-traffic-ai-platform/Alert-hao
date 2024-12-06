import { React, useState, useEffect } from "react";
import { LineChart } from '@mui/x-charts/LineChart';
import axios from 'axios';
import { Container } from "@mui/material";
import Spinner from 'react-bootstrap/Spinner';
import { PiecewiseColorLegend } from "@mui/x-charts/ChartsLegend";
import { ChartsReferenceLine } from "@mui/x-charts/ChartsReferenceLine";
const IOTTrafficHistory = (props) => {
    // use props.deviceId, pass in deviceIdNo from parent component (e.g. when clicked on in map)
    // const [deviceId, setDeviceId] = useState("b1a79cb2-dfb8-4680-9ebb-3604fd37db85");
    const [speedHistoryValues, setSpeedHistoryValues] = useState([]);
    const [timestampHistoryValues, setTimestampHistoryValues] = useState([]);
    const dateFormatter = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    });
    const getTrafficHistory = async () => {
        try {
            //localhost
          const response = await axios.get(`/api/v1/iot/traffic/history/${props.deviceId}`, {
            params: {
              limit: 200
            },
          }); 
          
          /*
          //aws
          const response = await axios.get(`/aws/api/v1/iot/traffic/history/${props.deviceId}`, {
            params: {
              limit: 200
            },
          });
          */
          const trafficResults = response.data;
          const formattedTrafficResults = trafficResults.map(result => {
            return {
                speed: JSON.parse(result.trafficData).flowSegmentData.currentSpeed,
                timestamp: dateFormatter.format(new Date(result.createdAt))
            }
          })
          setSpeedHistoryValues(formattedTrafficResults.map(data => data.speed));
          setTimestampHistoryValues(formattedTrafficResults.map(data => data.timestamp))
        } catch (error) {
          console.error("Error getting traffic history");
        }
    };

    useEffect(() => {
        getTrafficHistory();
    }, [props.deviceId])
    return(
        <Container>
            <h5> Traffic Speed History </h5>
            {speedHistoryValues.length == 0 ?         
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
                            data: timestampHistoryValues, 
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
                            data: speedHistoryValues, 
                            scaleType: "linear",
                            showMark: false,
                            label: "MPH",
                        },
                    ]}
                    //
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

export default IOTTrafficHistory;