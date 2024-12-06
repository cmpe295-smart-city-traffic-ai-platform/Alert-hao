import React, {Component} from "react";
class Settings extends Component {
render() {
    const user_id = localStorage.getItem("user_id");
    if(user_id == null)
        window.location = "/login"; 
    return(
        <div><h1>Settings Page</h1></div>
    );
}
}

export default Settings;