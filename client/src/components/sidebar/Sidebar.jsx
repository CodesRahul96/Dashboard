// src/components/Sidebar.js
import React from "react";
import { Link, Route, useLocation } from "react-router-dom";
import Dashboard from "../../assets/Dashboard.svg";
import ProjectList from "../../assets/Project-list.svg";
import CreateProject from "../../assets/create-project.svg";
import DashboardActive from "../../assets/Dashboard-active.svg";
import ProjectListActive from "../../assets/Project-list-active.svg";
import CreateProjectActive from "../../assets/create-project-active.svg";
import Logout from "../../assets/Logout.svg";
import "./Sidebar.css";

function Sidebar() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  const getIcon = (path, activeIcon, inactiveIcon) => {
    return isActive(path) ? activeIcon : inactiveIcon;
  };

  return (
    <div className="sidebar">
      <div className="logo"></div>
      <div className="sidebaritems">
        <ul>
          <li className={isActive("/")}>
            <Link to="/">
              <div className="sideLineUp"></div>
              <img src={getIcon("/", DashboardActive, Dashboard)} alt="dash" />
              <div className="sideLineDown"></div>
            </Link>
          </li>
          <li className={`${isActive("/projects")} projects-li`}>
            <Link to="/projects">
              <div className="sideLineUp"></div>
              <img
                className="project-list"
                src={getIcon("/projects", ProjectListActive, ProjectList)}
                alt="ProjectList"
              />
              <div className="sideLineDown"></div>
            </Link>
          </li>
          <hr className="separator" />
          <li className={isActive("/create")}>
            <Link to="/create">
              <div className="sideLineUp"></div>
              <img
                className="create-project"
                src={getIcon("/create", CreateProjectActive, CreateProject)}
                alt="CreateProject"
              />
              <div className="sideLineDown"></div>
            </Link>
          </li>
        </ul>
      </div>
      <div className="logout">
      <Link to="/logout"><img src={Logout} alt="Logout" /></Link>
      </div>
    </div>
  );
}

export default Sidebar;
