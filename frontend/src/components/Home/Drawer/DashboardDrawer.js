import {React, useState} from 'react'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import TableDevice from '../Table/TableDevice'
import DrawerContent from './DrawerContent';
const DashboardDrawer = (props) => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>View Data</Button>
      <Drawer open={open} onClose={toggleDrawer(false)} anchor={'right'}>
        <DrawerContent 
         device={props.device}
         onClose = {toggleDrawer(false)}
         TableDevice ={TableDevice}
         type = {props.type}
         />
      </Drawer>
    </div>
  );
}
export default DashboardDrawer;