// src/components/Sidebar.js
import React from "react";
import { Link, useLocation } from "react-router-dom";
import Dashboard from "../../assets/Dashboard.svg";
import ProjectList from "../../assets/Project-list.svg";
import CreateProject from "../../assets/create-project.svg";
import Logout from "../../assets/Logout.svg";
import "./Sidebar.css";

function Sidebar() {
  const location = useLocation();

  return (
    <div className="sidebar">
      <div className="logo"></div>
      <div className="sidebaritems">
        <ul>
          <li className={location.pathname === '/' ? 'active' : ''}>
            <Link to="/">
              <img src={Dashboard} alt="dash" />
            </Link>
          </li>
          <li className={location.pathname === '/projects' ? 'active' : ''}>
            <Link to="/projects">
              <img src={ProjectList} alt="ProjectList" />
            </Link>
          </li>
          <li className={location.pathname === '/create' ? 'active' : ''}>
            <Link to="/create">
              <img src={CreateProject} alt="CreateProject" />
            </Link>
          </li>
        </ul>
      </div>
      <div className="logout">
        <Link to="/logout">
          <img src={Logout} alt="Logout" />
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
