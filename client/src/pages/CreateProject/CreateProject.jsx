import "./createProject.css";
import React, { useState } from "react";
import { useAuth } from "../../store/auth";
import { Link, useNavigate } from "react-router-dom";
import BackButton from "../../assets/back-arrow.svg";
import Logo from "../../assets/Logo.svg";
import Logout from "../../assets/Logout.svg";
import { toast } from "react-toastify";

const CreateProject = () => {
  const { URI } = useAuth();
  const navigate = useNavigate();
  document.title = "Create Project";

  const initialProjectState = {
    projectName: "",
    department: "maintenance",
    reason: "business",
    category: "quality A",
    priority: "high",
    type: "internal",
    division: "filters",
    location: "pune",
    startDate: "",
    endDate: "",
    status: "Registered",
  };

  const [project, setProject] = useState(initialProjectState);
  const [dateError, setDateError] = useState("");
  const [projectNameError, setProjectNameError] = useState("");

  //lets tackle Input Form
  const handleInput = (e) => {
    const { name, value } = e.target;
    console.log(`Setting ${name} to ${value}`);
    setProject({ ...project, [name]: value });
  };

  //lets tackle Submit Form
  const handleProjectSubmit = async (e) => {
    e.preventDefault();
  
    if (!project.projectName) {
      setProjectNameError('Project Theme is required');
      return; // Prevent submission
    }
  
    // Check if the start date is greater than the end date
    if (new Date(project.startDate) > new Date(project.endDate)) {
      setDateError("End date is smaller than the start date");
      toast.error("End date is smaller than the start date");
      return; // Prevent submission
    }
  
    try {
      const response = await fetch(`${URI}/api/project/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
      });
  
      console.log("response: ", response);
  
      if (response.ok) {
        setProject(initialProjectState);
        setProjectNameError(""); // Reset the error when successful
        const data = await response.json();
        toast.success("Project Saved");
        console.log(data);
        navigate("/projects");
      }
    } catch (error) {
      toast.error(error);
    }
  };
  
  

  return (
    <div className="createDashboard">
      <div className="createContainer">
        {/* Topbar Content */}
        <div className="createContent">
          <div className="createProjectName">
            <Link to="/" className="backButton">
              <img src={BackButton} alt="back" />
            </Link>
            <span className="name">Create Project</span>
          </div>
          <div className="logoContainer">
            <img src={Logo} alt="logo" />
          </div>
          <div className="createLogout">
            <Link to="/logout">
              <img src={Logout} alt="Logout" />
            </Link>
          </div>
        </div>

        {/* project Form  */}
        <div className="form-wrapper">
          <form onSubmit={handleProjectSubmit} className="form-container">
            {/* Project Name: */}
            <div className="wrapper">
              <div className="name-container">
                <label className="form-label">
                  {/* Project Name: */}
                </label>
                <input
                  placeholder="Enter Project Theme"
                  type="text"
                  className={`project-name-input ${projectNameError ? 'error' : ''}`}
                  name="projectName"
                  value={project.projectName}
                  onChange={handleInput}
                  // required
                />
                {projectNameError && (
                  <p className="text-danger">{projectNameError}</p>
                )}
              </div>
              <div className="btn-1">
                <button type="submit" className="save-button">
                  Save Project
                </button>
              </div>
            </div>

            {/* Project Reason: */}
            <div className="wrapper">
              <div className="select-container">
                <label className="form-label">Reason:</label>
                <select
                  className="form-select"
                  name="reason"
                  value={project.reason}
                  onChange={handleInput}
                  required
                >
                  <option value="business">For Business</option>
                  <option value="personal">For Personal</option>
                  <option value="dealership">For Dealership</option>
                  <option value="transport">For Transport</option>
                </select>
              </div>

              {/* Project Type: */}
              <div className="select-container">
                <label className="form-label">Type:</label>
                <select
                  className="form-select"
                  name="type"
                  value={project.type}
                  onChange={handleInput}
                  required
                >
                  <option value="internal">Internal</option>
                  <option value="external">External</option>
                  <option value="vendor">Vendor</option>
                </select>
              </div>

              {/* Project Division: */}
              <div className="select-container">
                <label className="form-label">Division:</label>
                <select
                  className="form-select"
                  name="division"
                  value={project.division}
                  onChange={handleInput}
                  required
                >
                  <option value="filters">Filters</option>
                  <option value="compressor">Compressor</option>
                  <option value="pumps">Pumps</option>
                  <option value="glass">Glass</option>
                  <option value="water heater">Water Heater</option>
                </select>
              </div>
            </div>

            {/* Project Category: */}
            <div className="wrapper">
              <div className="select-container">
                <label className="form-label">Category:</label>
                <select
                  className="form-select"
                  name="category"
                  value={project.category}
                  onChange={handleInput}
                  required
                >
                  <option value="quality A">Quality A</option>
                  <option value="quality B">Quality B</option>
                  <option value="quality C">Quality C</option>
                  <option value="quality D">Quality D</option>
                </select>
              </div>

              {/* Project Priority: */}
              <div className="select-container">
                <label className="form-label">Priority:</label>
                <select
                  className="form-select"
                  name="priority"
                  value={project.priority}
                  onChange={handleInput}
                  required
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>

              {/* Project Department: */}

              <div className="select-container">
                <label className="form-label">Department:</label>
                <select
                  className="form-select"
                  name="department"
                  value={project.department}
                  onChange={handleInput}
                  required
                >
                  <option value="maintenance">Maintenance</option>
                  <option value="strategy">Strategy</option>
                  <option value="finance">Finance</option>
                  <option value="quality">Quality</option>
                  <option value="stores">Stores</option>
                </select>
              </div>
            </div>

            {/* Project Location: */}

            <div className="wrapper">
              <div className="select-container">
                <label className="">Location:</label>
                <select
                  className="form-select"
                  name="location"
                  value={project.location}
                  onChange={handleInput}
                  required
                >
                  <option value="pune">Pune</option>
                  <option value="mumbai">Mumbai</option>
                  <option value="nashik">Nashik</option>
                  <option value="thane">Thane</option>
                  <option value="delhi">Delhi</option>
                </select>
              </div>

              {/* Project Start Date: */}

              <div className="date-container">
                <label className="form-label">Start Date:</label>
                <input
                  name="startDate"
                  type="date"
                  className="date-input"
                  value={project.startDate}
                  onChange={handleInput}
                  required
                />
              </div>

              {/* Project End Date: */}

              <div className="date-container">
                <label className="form-label">End Date:</label>

                <input
                  name="endDate"
                  type="date"
                  className="date-input"
                  value={project.endDate}
                  onChange={handleInput}
                  required
                />
            {dateError && <p className="text-danger">{dateError}</p>}
              </div>
            </div>

            {/* Project Status and Button: */}

            <div className="button-container">
              <div className="status-container">
                <label className="form-label status-label">Status:</label>
                <span className="form-text status-text"> {project.status}</span>
              </div>

              <div className="btn-2">
                <button type="submit" className="save-button">
                  Save Project
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;
