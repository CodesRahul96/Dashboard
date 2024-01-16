// src/components/MainContent.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import CreateProject from "../pages/CreateProject/CreateProject";
import { Project } from "../pages/project/Project";
import Dashboard from "./dashboard/Dashboard";
import { Logout } from "../pages/Login/Logout";

function MainContent() {
  return (
    <div className="main-content">
      <Routes>
        <Route path="/" exact element={<Dashboard />} />
        <Route path="/create" element={<CreateProject />} />
        <Route path="/projects" element={<Project />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </div>
  );
}

export default MainContent;
