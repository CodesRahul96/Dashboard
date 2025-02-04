// src/components/MainContent.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import CreateProject from "../pages/CreateProject/CreateProject";
import Project from "../pages/project/Project";
import Dashboard from "../pages/dashboard/Dashboard";
import { Logout } from "../pages/Login/Logout";
import { ErrorPage } from "../pages/ErrorPage";
import Counter from "../pages/dashboard/Counter/Counter";

function MainContent() {
  return (
    <div className="main-content">
      <Routes>
        <Route path="/" exact element={<Dashboard />} />
        <Route path="/create" element={<CreateProject />} />
        <Route path="/projects" element={<Project />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/counter" element={<Counter />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default MainContent;
