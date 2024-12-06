import {React, useState} from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import IOTTrafficHistory from '../../IOT/IOTTrafficComponents/IOTTrafficHistory';
import IOTTrafficPrediction from '../../IOT/IOTTrafficComponents/IOTTrafficPrediction';
import IOTTrafficCurrent from '../../IOT/IOTTrafficComponents/IOTTrafficCurrent';
import LiveFeed from '../Livefeed/Livefeed';

const DrawerContent = (props) => {
  if(props.type==='a'){
    return (
      <Box display="flex" flexDirection="column" gap={2} sx={{ width: 800 }} role="presentation" onClick={props.onClose}>
        <Button onClick={props.onClose}>Close</Button>
        <Stack alignItems="center" direction="row" spacing={10}>
          <h4>IOT Device ID: {props.device.id} </h4>
          <div><IOTTrafficCurrent deviceId={props.device.id}/></div>
        </Stack>
        {props.TableDevice && <props.TableDevice device={props.device}/>}
        <IOTTrafficHistory deviceId={props.device.id}/>
        {props.device.deviceIdNo !== null && <IOTTrafficPrediction deviceIdNo={props.device.deviceIdNo}/>}
      </Box>
    )
  } else if(props.type==='b'){
    return (
      <Box display="flex" flexDirection="column" gap={2} sx={{ width: 800 }} role="presentation" onClick={props.onClose}>
        <Button onClick={props.onClose}>Close</Button>
        <Stack alignItems="center" direction="row" spacing={10}>
          <h4>CCTV Device ID: {props.device.id} </h4>
        </Stack>
        {props.TableDevice && <props.TableDevice device={props.device}/>}
        <LiveFeed cctvLiveFeedUrl={props.device.url}/>
      </Box>
    )
  }else if(props.type==='c'){
    return (
      <Box display="flex" flexDirection="column" gap={2} sx={{ width: 800 }} role="presentation" onClick={props.onClose}>
        <Button onClick={props.onClose}>Close</Button>
        <Stack alignItems="center" direction="row" spacing={10}>
          <h4>Drone Device ID: {props.device.id} </h4>
        </Stack>
        {props.TableDevice && <props.TableDevice device={props.device}/>}
        {/*/Add if more data to display/*/}
      </Box>
    )
  }else{
    return (
      <Box display="flex" flexDirection="column" gap={2} sx={{ width: 800 }} role="presentation" onClick={props.onClose}>
        <Button onClick={props.onClose}>Close</Button>
        <Stack alignItems="center" direction="row" spacing={10}>
          <h4>Alert ID: {props.device.id} </h4>
        </Stack>
        {props.TableDevice && <props.TableDevice device={props.device}/>}
        {/*/Add if more data to display/*/}
      </Box>
    )
  }
};

export default DrawerContent;
