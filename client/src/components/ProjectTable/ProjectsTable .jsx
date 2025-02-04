import React from "react";
import "./projecttable.css";

// eslint-disable-next-line react/prop-types
const ProjectsTable = ({ projectData, onUpdateStatus }) => {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div className="table-responsive projectTable">
      <table className="table">
        <thead className="table-primary">
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
        <tbody >
          {projectData.map((project, index) => (
            <>
              {/* Mobile view */}
              <tr key={project._id} className="d-md-none mobile_container">
                <td className="mobile_card">
                  <div className="mobile_content">
                    <div className="card_content">
                      <div className="card_name">
                        <div className="card_title">
                          {project.projectName}
                        </div>
                        <div className="card_date">
                          {formatDate(project.startDate)} to{" "}
                          {formatDate(project.endDate)}
                        </div>
                      </div>

                      <div className="card_text">
                        <span className="card_soft_title">Reason:
                        <span>{project.reason} </span></span>

                        <span className="card_soft_title">Dept:
                        <span>{project.department}</span></span>

                        <span className="card_soft_title">Category:
                        <span>{project.category} </span>

                        <span className="card_soft_title">Priority:</span>
                        <span>{project.priority} </span></span>

                        <span className="card_soft_title">Type:
                        <span>{project.type} </span></span>

                        <span className="card_soft_title">Div:
                        <span>{project.division} </span></span>

                        <span className="card_soft_title">Location:
                        <span>{project.location} </span></span>

                        <span className="card_status">{project.status}</span>
                      </div>
                      <div className="btn-group" role="group">
                        <button
                          className="btns btns-start"
                          onClick={() => onUpdateStatus(project._id, "Running")}
                        >
                          Start
                        </button>
                        <button
                          className="btns btns-close"
                          onClick={() => onUpdateStatus(project._id, "Closed")}
                        >
                          Close
                        </button>
                        <button
                          className="btns btns-cancel"
                          onClick={() =>
                            onUpdateStatus(project._id, "Canceled")
                          }
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>

              {/* Desktop view */}
              <tr
                key={index}
                className="d-none d-md-table-row desktop-table"
              >
                <td>
                  <div className="desktop_name">
                  <span className="tableProjectName">
                        {project.projectName}
                      </span>

                      <span className="table_date">
                        {formatDate(project.startDate)} to{" "}
                        {formatDate(project.endDate)}
                      </span>
                  </div>
                </td>
                <td>{project.department}</td>
                <td>{project.reason}</td>
                <td>{project.category}</td>
                <td>{project.priority}</td>
                <td>{project.type}</td>
                <td>{project.division}</td>
                <td>{project.location}</td>
                <td
                  className="tableStatus"
                  style={{ color: "#00284C", fontSize: "16px" }}
                >
                  {project.status}
                </td>
                <td>
                  <div className="projectButtons">
                  <button
                    className="btns btns-start"
                    onClick={() => onUpdateStatus(project._id, "Running")}
                  >
                    Start
                  </button>
                  <button
                    className="btns btns-close"
                    onClick={() => onUpdateStatus(project._id, "Closed")}
                  >
                    Close
                  </button>
                  <button
                    className="btns btns-cancel"
                    onClick={() => onUpdateStatus(project._id, "Canceled")}
                  >
                    Cancel
                  </button>
                  </div>
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
