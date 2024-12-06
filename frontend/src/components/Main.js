import { React, Component } from "react";
import {Routes, Route} from "react-router-dom";
import NavigationBar from "./Navbar/Navbar";
import Home from "./Home/Home";
import Alerts from "./Alerts/Alerts";
import Settings from "./Settings/Settings";
import Registration from "./Registration/Registration";
import IOT from "./IOT/IOT";
import IOTTrafficHistory from "./IOT/IOTTrafficComponents/IOTTrafficHistory";
import IOTTrafficPrediction from "./IOT/IOTTrafficComponents/IOTTrafficPrediction";
import TrafficMap from "./Home/Traffic/TrafficMap";
import Login from "./Login/Login";
import Layout from "./Layout/Layout";
import CCTV from "./CCTV/CCTV";
import DRONE from "./DRONE/DRONE";

class Main extends Component {
    render(){
        return (
            <div>
                <Layout>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/alerts" component={Alerts} />
                    <Route exact path="/settings" component={Settings}/>
                    <Route exact path="/register" component={Registration}/>
                    <Route exact path="/iot" component={IOT}/>
                    <Route exact path="/iot/traffichistory" component={IOTTrafficHistory}/>
                    <Route exact path="/iot/trafficprediction" component={IOTTrafficPrediction}/>
                    <Route exact path="/trafficmap" component={TrafficMap}/>
                    <Route exact path="/cctv" component={CCTV}/>
                    <Route exact path="/drone" component={DRONE}/>
                </Layout>
            </div>
        )
    }
}
// <Route path="/" component={NavigationBar} />
export default Main;