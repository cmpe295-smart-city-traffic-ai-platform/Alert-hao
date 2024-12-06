import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "@fortawesome/fontawesome-free/css/all.min.css"; // Import Font Awesome for icons
import "./Sidebar.css"; // Import your custom CSS

const Sidebar = () => {
    const email = localStorage.getItem("email");
    const role =  localStorage.getItem("role");
    const lastN = localStorage.getItem("lastName");
    const firstN = localStorage.getItem("firstName");
    const user_id = localStorage.getItem("user_id");
    return (
      <div className="d-flex">
        {/* Sidebar */}
        <div className="sidebar bg-dark text-white p-3">
          {/* Admin Icon */}
          <div className="d-flex flex-column align-items-center mb-4">
            <i
              className="fas fa-user-tie fa-3x rounded-circle bg-white text-dark p-2"
              style={{ width: "80px", height: "80px" }}
            ></i>
            <div className="text-center mt-2">
              <h5 className="mb-0">{firstN} {lastN}</h5>
              <small>{role.toUpperCase()}</small>
            </div>
          </div>

          <ul className="nav nav-pills flex-column mb-auto">
            <li>
              <a href="/" className="nav-link text-white">
                <i className="fa-solid fa-table-columns me-2"></i> Dashboard
              </a>
            </li>
            {role === "traffic" ?
            <> 
            <li>
              <a href="/cctv" className="nav-link text-white">
                <i className="fa-solid fa-camera me-2"></i> CCTV Camera
              </a>
            </li>
            <li>
              <a href="/drone" className="nav-link text-white">
                <i className="fa-solid fa-plane me-2"></i> Drone Manager
              </a>
            </li>
            <li>
              <a href="/iot" className="nav-link text-white">
                <i className="fa-solid fa-wifi me-2"></i> IoT Manager
              </a>
            </li></> : <></> }
          </ul>
        </div>
      </div>
    );
  
}

export default Sidebar;
