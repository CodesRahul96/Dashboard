// src/components/CreateProject.js
import React, { useState } from "react";
import { useAuth } from "../../store/auth";

const CreateProject = () => {
  const { API } = useAuth();

  const initialProjectState = {
    projectName: "",
    department: "maintenance",
    reason: "business",
    category: "quality-A",
    priority: "high",
    type: "internal",
    division: "filters",
    location: "pune",
    startDate: "",
    endDate: "",
    status: "Registered",
  };

  const [project, setProject] = useState(initialProjectState);
  const [error, setError] = useState("");

  //lets tackle Input Form
  const handleInput = (e) => {
    const { name, value } = e.target;
    console.log(`Setting ${name} to ${value}`);
    setProject({ ...project, [name]: value });
  };

  //lets tackle Submit Form
  const handleProjectSubmit = async (e) => {
    e.preventDefault();

    // Check if the start date is greater than the end date
    if (new Date(project.startDate) > new Date(project.endDate)) {
      alert("End date must be equal to or after the start date.");
      return; // Prevent submission
    }

    try {
      const response = await fetch(`${API}/api/projects/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
      });

      console.log("response: ", response);

      if (response.ok) {
        setProject(initialProjectState);
        const data = await response.json();
        alert("Project Created Successfully");
        console.log(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="create-container">
      <h2 className="mb-4">Create Project</h2>
      <form onSubmit={handleProjectSubmit} className="row mt-4">
        <div className="row g-0">
          <div className="col-sm-6 col-md-8">
            <label className="form-label">
              {/* Project Name: */}
              <input
                placeholder="Enter Project Theme"
                type="text"
                className="form-control projectName "
                name="projectName"
                value={project.projectName}
                onChange={handleInput}
                required
              />
            </label>
          </div>
        </div>

        <div className="row md-4 mt-4">
          <div className="col">
            <label className="form-label">
              Reason:
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
            </label>
          </div>

          <div className="col">
            <label className="form-label">
              Type:
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
            </label>
          </div>

          <div className="col">
            <label className="form-label">
              Division:
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
            </label>
          </div>
        </div>

        <div className="row md-4 mt-4">
          <div className="col">
            <label className="form-label">
              Category:
              <select
                className="form-select"
                name="category"
                value={project.category}
                onChange={handleInput}
                required
              >
                <option value="quality-A">Quality A</option>
                <option value="quality-B">Quality B</option>
                <option value="quality-C">Quality C</option>
                <option value="quality-D">Quality D</option>
              </select>
            </label>
          </div>

          <div className="col">
            <label className="form-label">
              Priority:
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
            </label>
          </div>

          <div className="col">
            <label className="form-label">
              Department:
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
            </label>
          </div>
        </div>

        <div className="row md-4 mt-4">
          <div className="col">
            <label className="form-label">
              Location:
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
            </label>
          </div>

          <div className="col">
            <label className="form-label">
              Start Date:
              <input
                name="startDate"
                type="date"
                className="form-control"
                value={project.startDate}
                onChange={handleInput}
                required
              />
            </label>
          </div>

          <div className="col">
            <label className="form-label">
              End Date:
              <input
                name="endDate"
                type="date"
                className="form-control"
                value={project.endDate}
                onChange={handleInput}
                required
              />
            </label>
          </div>
        </div>

        <div className="col md-6">
          <div className="col mt-4">
            <label className="form-label">
              Status:
              <span className="form-text"> {project.status}</span>
            </label>
          </div>

          <div className="col mt-4">
            <button type="submit" className="btn btn-primary">
              Create Project
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateProject;
