import {React} from "react";

const DRONE = ()=>  {

    const email = localStorage.getItem("email");
    const role =  localStorage.getItem("role");
    const lastN = localStorage.getItem("lastName");
    const firstN = localStorage.getItem("firstName");
    const user_id = localStorage.getItem("user_id");

    if(user_id == null)
        window.location = "/login"; 
    return(
        <div>
            <h1>Drone Station Management</h1>
            Email: {email}
            <br/>
            Role: {role}
            <br/>
            First Name: {firstN}
            <br/>
            Last Name: {lastN}
            <br/>
            UUID: {user_id}
        </div>
    );
}

export default DRONE;