import React, {
  Component,
  useEffect,
  useState,
  useCallback,
  useRef,
  useMemo,
} from "react";
import NavigationBar from "../Navbar/Navbar";
import axios from "axios";
import {
  AdvancedMarker,
  InfoWindow,
  Map,
  Pin,
  APIProvider,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import iotImage from "../../images/iotImage.png";
import cctvImage from "../../images/cctvImage.png";
import droneImage3 from "../../images/droneImage3.png";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import {red} from '@mui/material/colors';
import DashboardDrawer from "./Drawer/DashboardDrawer";
import IOTTrafficCurrent from "../IOT/IOTTrafficComponents/IOTTrafficCurrent";
import  Stack  from "@mui/material/Stack";
import Box from "@mui/material/Box";
//In Progress: Confifure when user is trafficagent vs client agent
import cctvData from './CCTVData.json';
import droneData from './DroneData.json';
import alertData from './AlertData.json';
import PinColor from "./Pin/PinColor";

const AdvancedMarkerWithRef = (props) => {
  const { children, onMarkerClick, setMarkerRef, id, ...advancedMarkerProps } =
    props;
  const [markerRef, marker] = useAdvancedMarkerRef();

  useEffect(() => {
    if (marker) {
      setMarkerRef(marker, id);
    }
  }, [marker, setMarkerRef, id]);
  return (
    <AdvancedMarker
      onClick={() => {
        if (marker) {
          onMarkerClick(marker);
        }
      }}
      ref={markerRef}
      {...advancedMarkerProps}
    >
      {children}
    </AdvancedMarker>
  );
};

const Home = () => {
  //If not logged in, sent user to login page
  if (localStorage.getItem("user_id") === null){
    window.location = "/login"
  }

  //Homepage variables
  const [droneDevices, setDroneDevices] = useState([]);
  const [iotDevices, setIotDevices] = useState([]);
  const [cctvDevices, setCctvDevices] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchDevice, setSearchDevice] = useState("");
  const [deviceName, setDeviceName] = useState("");
  const [allDevices, setAllDevices] = useState([]);
  const [selectedValue, setSelectedValue] = useState('a');
  const [predictionDevices, setPredictionDevices] = useState([]);
  const user_id = localStorage.getItem("user_id");

  //Google Map variables
  const [hoverId, setHoverId] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [infoWindowShown, setInfoWindowShown] = useState(false);
  const [zIndexSelected, setZIndexSelected] = useState(null);
  const [zIndexHover, setZIndexHover] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const markerRefs = useRef({});
  const onMouseEnter = useCallback((id) => setHoverId(id), []);
  const onMouseLeave = useCallback(() => setHoverId(null), []);
  
  const onMarkerClick = useCallback(
    (id, marker) => {

      const device = allDevices.find((a) => a.id === id);
      setSelectedId(id);
      setSelectedDevice(device);
      if (marker) {
        setSelectedMarker(marker);
      }
      if (id !== selectedId) {
        setInfoWindowShown(true);
      } else {
        setInfoWindowShown((isShown) => !isShown);
      }
    },

    [selectedId, allDevices]
  );
  //when user clicks map, close any info windows
  const onMapClick = useCallback(() => {
    setSelectedId(null);
    setSelectedMarker(null);
    setInfoWindowShown(false);
  }, []);

  //used to close the infowindows
  const handleInfowindowCloseClick = useCallback(
    () => setInfoWindowShown(false),
    []
  );
  //used to store the device id to be searched
  const handleSearchChange = (event) => {
    setSearchDevice(event.target.value);
  };
  //only when submit is clicked, search for the the device
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setDeviceName(searchDevice);
    //for iot service
    //const device = iotDevices.find((iot) => iot.id === searchDevice);
    //for dashboard service
    const device = allDevices.find((a) => a.id === searchDevice);
    if (device) {
      //iot
      //const marker = markerRefs.current[device.id];
      //dashboard
      const marker = markerRefs.current[device.id];
      
      //iot service
      //onMarkerClick(device.id, marker);
      //dashboard
      onMarkerClick(device.id, marker);
    } else {
      alert("Device not found");
    }
  };

  const setMarkerRef = (marker, id) => {
    markerRefs.current[id] = marker;
  };

  const handleRadioValueChange = (event) => {
    setSelectedValue(event.target.value);
  };
  ///dashboard service backend
  /*
    useEffect(() => {
      const getAllDevicesData = async () => {
      try {
        const [response1, response2, response3] = await Promise.all([
          axios.get("http://localhost:8080/api/dashboard/iot"),
          axios.get("http://localhost:8080/api/dashboard/cctv"),
          axios.get("http://localhost:8080/api/dashboard/drone"),
        ]);

        const mergeAllDevices = [
          ...response1.data,
          ...response2.data,
          ...response3.data
        ]

        const formatedDevices = mergeAllDevices
          .sort((a, b) => b.latitude - a.latitude)
          .map((dataItem, index) => ({ ...dataItem, zIndex: index }));
        setAllDevices(formatedDevices);
        setZIndexSelected(formatedDevices.length);
        setZIndexHover(formatedDevices.length + 1);
        console.log(formatedDevices)
      } catch (error) {
        console.error("Error getting the IoT Devices");
      }
    };
    getAllDevicesData();
    
    
    //setAllDevices([...iotDevices, ...cctvDevices, ...droneDevices]);
    //    console.log(allDevices);
        }, []);
      */
  ///IOT SESRVICE BACKEND
      
  useEffect(() => {
    
    //GET PREDICTION DEVICES
    const getPredictionDevices = async() => {
      try{
        const response = await axios.get("http://localhost:8080/api/v1/iot/predictionDevices");
        const formatedDevices = response.data
          .map((item) => {
            const [lat, long] = item.location
              .replace("location:", "")
              .split(",");
            return {
              ...item,
              latitude: parseFloat(lat),
              longitude: parseFloat(long),
            };
          })
          .sort((a, b) => b.latitude - a.latitude)
          .map((dataItem, index) => ({ ...dataItem, zIndex: index }));
        console.log(response);
        setIotDevices(formatedDevices);
        setZIndexSelected(formatedDevices.length);
        setZIndexHover(formatedDevices.length + 1);
      } catch{
        console.error("Error getting the IoT PREDICTION Devices");
      }
    };
    //TEST USING PREDICTION DEVICES ONLY
    //getPredictionDevices();

    //GET DEVICES BASED ON RADIO BUTTON SELECTED
    const getDevices = async () => {
      try {
          let testData = [];
          let url = '';
          let url2 = '';
          let userId = "";
          
          if (selectedValue === 'a'){
            url = 'http://localhost:8080/api/v1/iot/predictionDevices';//IOT devices local
            userId = localStorage.getItem("user_id");
            url2 = "http://localhost:8080/api/v1/iot";//specific devices
            //let url3 = '/aws/api/v1/iot/predictionDevices'//AWS FETCH IOT Prediction DEVICES
            const response = await axios.get(url);//change to url3 to test Aws connection
            testData = response.data;
          } else if (selectedValue === 'b'){
            url = '';//CCTV API
            //Modify once connected to CCTV SERVICE
            userId = localStorage.getItem("user_id")
            testData = cctvData
            
          } else if (selectedValue === 'c'){
            url = '';//Drones API
            userId = localStorage.getItem("email");
            /// //Modify once connected to DRONE SERVICE
            testData = droneData
            
          }else{
              url = '';//Alerts API
              userId = localStorage.getItem("user_id");
              /// //Modify once connected to ALERT SERVICE
              testData = alertData
            }
          //const response = await axios.get(url); //TEST PREDICTION IOT DEVICES
          //const response = await axios.get(url3);//TEST IOT SERVICE HOSTED ON CLOUD
          /*
          const response = await axios.get(url2, {
            params: {
              userId: userId,
            },
          });*////TEST DEVICES FOR SPECIFIC USER
          //testData =response.data///TEST DEVICES FOR SPECIFIC USER
          setAllDevices([]);
          if (testData && testData.length > 0){
            const formatedDevices = testData
            .map((item) => {
              const [lat, long] = item.location
                .replace("location:", "")
                .split(",");
              return {
                ...item,
                latitude: parseFloat(lat),
                longitude: parseFloat(long),
              };
            })
            .sort((a, b) => b.latitude - a.latitude)
            .map((dataItem, index) => ({ ...dataItem, zIndex: index }));
          setAllDevices(formatedDevices);
          setZIndexSelected(formatedDevices.length);
          setZIndexHover(formatedDevices.length + 1);
      }
      } catch (error) {
        console.error("Error getting the IoT Devices");
      }
    };
    getDevices(); 
    

  }, [selectedValue]);
   
  //Use memo so page does not re-render 
  const memoDevices = useMemo(() => allDevices, [allDevices]);
  //IOT SERVICE TESTING
  return (
    <div>
      <h3>Dashboard</h3>
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '10vh', 
          }} 
          >
      <Stack  direction="row" spacing={20}>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 400,
            borderRadius: 28,
          }}
          onSubmit={handleSearchSubmit}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Device"
            inputProps={{ "aria-label": "search device google maps" }}
            onChange={handleSearchChange}
          />
          <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
        
        <FormControl>
          <FormLabel id="select-device-radio-buttons-group-label">
            <RadioGroup
              row
              aria-labelledby="select-device-radio-buttons-group-label"
              name="select-device-radio-button-group"
            >
              <FormControlLabel 
                checked={selectedValue === 'a'}
                onChange={handleRadioValueChange}
                value="a"
                label="IOT STATIONS"
                color = "primary"
                control={<Radio />}  
              />
              <FormControlLabel
                checked={selectedValue === 'b'}
                onChange={handleRadioValueChange}              
                value="b"              
                label="CCTV"              
                            
                control={<Radio color = "secondary"/>}                            
              />
              <FormControlLabel
                checked={selectedValue === 'c'}
                onChange={handleRadioValueChange}              
                value="c"              
                label="DRONES"                          
                control={<Radio color="success"/>}                            
              />
              <FormControlLabel
                checked={selectedValue === 'd'}
                onChange={handleRadioValueChange}              
                value="d"              
                label="ALERTS"              
                color = "secondary"              
                control={<Radio sx={{
                  
                  '&.Mui-checked': {
                    color: red[600],
                  },
                }}/>}                            
              />
            </RadioGroup>
          </FormLabel>
      </FormControl>
    </Stack>
    </Box>
      <APIProvider
        apiKey={""}
        libraries={["marker"]}
      >
        <Map
          mapId={""}
          style={{ width: "auto", height: "70vh" }}
          defaultCenter={{ lat: 37.33548, lng: -121.893028 }}
          defaultZoom={12}
          gestureHandling={"greedy"}
          disableDefaultUI
          onClick={onMapClick}
        >
          {memoDevices.map((device, index) => {
            let zIndex = device.zIndex;

            if (hoverId === device.id) {
              zIndex = zIndexHover;
            }
            if (selectedId === device.id) {
              zIndex = zIndexSelected;
            }
            return (
              <AdvancedMarkerWithRef
                key={device.id}
                zIndex={zIndex}
                id={device.id}
                setMarkerRef={setMarkerRef}
                className="custom-maker"
                position={{ lat: device.latitude, lng: device.longitude }}
                onMarkerClick={(marker) =>
                  onMarkerClick(device.id, markerRefs.current[device.id])
                }
                onMouseEnter={() => onMouseEnter(device.id)}
                onMouseLeave={onMouseLeave}
                style={{
                  transform: `scale(${
                    [hoverId, selectedId].includes(device.id) ? 1.4 : 1
                  })`,
                }}
              >
                <PinColor deviceId={device.id} active={device.active} type={selectedValue}/>
              </AdvancedMarkerWithRef>
            );
          })}
          {infoWindowShown && selectedMarker && selectedDevice && (
            <InfoWindow
              anchor={selectedMarker}
              onCloseClick={handleInfowindowCloseClick}
            >
              <Box 
                alignItems="center"
                display="flex"
                justifyContent="center"
                flexDirection="column"
              >
                <h2>Name: {selectedDevice.name}</h2>
                <p>ID: {selectedDevice.id}</p>
                <p>Location: {selectedDevice.location}</p>
                <p>Active: {selectedDevice.active.toString()}</p>
                {selectedValue==='a' &&
                  <div><IOTTrafficCurrent deviceId={selectedDevice.id}/></div>//display speed for iot
                }
                <DashboardDrawer device={selectedDevice} type={selectedValue}/>
              </Box>
            </InfoWindow>
          )}
        </Map>
      </APIProvider>
    </div>
  );
};

export default Home;
