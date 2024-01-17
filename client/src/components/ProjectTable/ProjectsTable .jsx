import "./projectTable.css";
import React from "react";

const ProjectsTable = ({ projectData, onUpdateStatus }) => {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div className="table-responsive projectTable">
      <table className="table">
        <thead className="table-secondary">
          <tr>
            <th>Project Name</th>
            <th>Department</th>
            <th>Reason</th>
            <th>Category</th>
            <th>Priority</th>
            <th>Type</th>
            <th>Division</th>
            <th>Location</th>
            <th>Status</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {projectData.map((project) => (
            <>
            <tr key={project._id} className="d-md-none">
              <td colSpan="10">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{project.projectName}</h5>
                    <p className="card-text">
                      <strong>Department:</strong> {project.department}
                      <br />
                      <strong>Reason:</strong> {project.reason}
                      <br />
                      <strong>Category:</strong> {project.category}
                      <br />
                      <strong>Priority:</strong> {project.priority}
                      <br />
                      <strong>Type:</strong> {project.type}
                      <br />
                      <strong>Division:</strong> {project.division}
                      <br />
                      <strong>Location:</strong> {project.location}
                      <br />
                      <span className="status">
                      <strong >Status:</strong> {project.status}</span>
                      <br />
                      <strong>Dates:</strong> {formatDate(project.startDate)} to {formatDate(project.endDate)}
                    </p>
                    <div className="btn-group" role="group">
                      <button className="btn btn-primary" onClick={() => onUpdateStatus(project._id, "Running")}>
                        Start
                      </button>
                      <button className="btn btn-outline-primary" onClick={() => onUpdateStatus(project._id, "Closed")}>
                        Close
                      </button>
                      <button className="btn btn-outline-primary" onClick={() => onUpdateStatus(project._id, "Canceled")}>
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr key={project._id} className="d-none d-md-table-row">
              {/* Render table row for screens larger than or equal to md size */}
              <td>
                <div>
                  <p>
                    <h6 className="tableProjectName">{project.projectName}</h6>-{" "}
                    {formatDate(project.startDate)} to {formatDate(project.endDate)}
                  </p>
                </div>
              </td>
              <td>{project.department}</td>
              <td>{project.reason}</td>
              <td>{project.category}</td>
              <td>{project.priority}</td>
              <td>{project.type}</td>
              <td>{project.division}</td>
              <td>{project.location}</td>
              <td className="tableStatus">{project.status}</td>
              <td>
                <button className="btn btn-primary" onClick={() => onUpdateStatus(project._id, "Running")}>
                  Start
                </button>
                <button className="btn btn-outline-primary" onClick={() => onUpdateStatus(project._id, "Closed")}>
                  Close
                </button>
                <button className="btn btn-outline-primary" onClick={() => onUpdateStatus(project._id, "Canceled")}>
                  Cancel
                </button>
              </td>
            </tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectsTable;
