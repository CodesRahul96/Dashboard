import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";
import "./project.css";
import { useAuth } from "../../store/auth";
import { Link } from "react-router-dom";
import BackButton from "../../assets/back-arrow.svg";
import Logo from "../../assets/Logo.svg";
import Logout from "../../assets/Logout.svg";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";

const Project = () => {
  const { URI } = useAuth();
  const [projectData, setProjectData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProjects, setTotalProjects] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const pageSize = 8;
  document.title = "All Project";

  //   fatching data
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${URI}/api/project?page=${currentPage}&pageSize=${pageSize}&search=${searchQuery}&sortBy=${sortBy}`
      );

      if (response.status === 200) {
        setProjectData(response.data.projects);
        setTotalProjects(response.data.totalProjects);
      }
    } catch (error) {
      console.error(`Fetching Projects from server: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  //   Project Status Update
  const handleUpdateStatus = async (projectId, newStatus) => {
    try {
      // Fetch current project status
      const currentProject = projectData.find((proj) => proj._id === projectId);
      if (!currentProject) {
        console.error("Project not found");
        return;
      }

      // Check if the status transition is allowed
      if (
        (currentProject.status === "close" && newStatus === "running") ||
        (currentProject.status === "close" && newStatus === "cancel") ||
        (currentProject.status === "cancel" && newStatus === "close")
      ) {
        console.error("Invalid status transition");
        return;
      }

      await axios.put(`http://localhost:5000/api/project/${projectId}`, {
        status: newStatus,
      });

      // Update project status in the state without reloading the page
      setProjectData((prevData) =>
        prevData.map((proj) =>
          proj._id === projectId ? { ...proj, status: newStatus } : proj
        )
      );
    } catch (error) {
      console.error("Error updating project status:", error);
    }
  };


  // Pagination
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= Math.ceil(totalProjects / pageSize)) {
      setCurrentPage(newPage);
    }
  };

  // Search Project
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // clear search input
  const handleClearSearch = () => {
    setSearchQuery("");
  };

  //   Sort Project
  const handleSortChange = (field) => {
    setSortBy(field);
  };

  // date format change
  const formatDate = (dateString) => {
    const options = { month: "short", year: "numeric", day: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-US",
      options
    );
    return formattedDate;
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, searchQuery, sortBy]);

  return (
    <div className="project-container">
      {/* Topbar Content */}
      <div className="projectContent">
        <div className="ProjectName">
          <Link to="/" className="backButton">
            <img src={BackButton} alt="back" />
          </Link>
          <span className="name">Project Listing</span>
        </div>
        <div className="logoContainer">
          <img src={Logo} alt="logo" />
        </div>
        <div className="projectLogout">
          <Link to="/logout">
            <img src={Logout} alt="Logout" />
          </Link>
        </div>
      </div>

      <div className="table-border">
        <div className="project-table-container">
          {/* Project Search/Sort Queries */}
          <div className="project-queries-container">
            {/* Search Input */}
            <div className="search-container">
              {/* Search Icon */}
              <div className="search-icon-container">
                <AiOutlineSearch className="search-icon" />
              </div>

              {/* Search Input */}
              <input
                name="search"
                className="search-input"
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />

              {/* Clear Text Icon */}
              {searchQuery && (
                <div
                  className="clear-icon-container"
                  onClick={handleClearSearch}
                >
                  <AiOutlineClose className="clear-icon" />
                </div>
              )}
            </div>

            {/* Sort Field Dropdown */}
            <div className="sort-container">
              <label className="sort-label">Sort By: </label>
              <select
                className="sort_data"
                onChange={(e) => handleSortChange(e.target.value)}
                value={sortBy}
              >
                <option value="">Default</option>
                <option value="status">Status</option>
                <option value="reason">Reason</option>
                <option value="category">Category</option>
                <option value="location">Location</option>
                <option value="department">Department</option>
                <option value="startDate">Start Date</option>
                <option value="endDate">End Date</option>
                {/* Add more options for other fields as needed */}
              </select>
            </div>
          </div>

          <div className="table-wrapper">
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <Fragment>
                <div className="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Reason</th>
                        <th>Type</th>
                        <th>Division</th>
                        <th>Category</th>
                        <th>Priority</th>
                        <th>Dept.</th>
                        <th>Location</th>
                        <th>Status</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {projectData.length > 0 ? (
                        projectData.map((project, index) => (
                          <tr key={index}>
                            <td>
                              <h6 className="project-name">
                                {project.projectName}
                              </h6>
                              <div className="table-date">
                                <span>{formatDate(project.startDate)}</span> to{" "}
                                <span>{formatDate(project.endDate)}</span>
                              </div>
                            </td>

                            <td>
                              <span className="project-reason">Reason:</span>{" "}
                              {project.reason}
                            </td>

                            <td>
                              <span className="project-type">Type:</span>{" "}
                              {project.type}
                            </td>
                            <td>
                              <span className="project-div">Division:</span>{" "}
                              {project.division}
                            </td>
                            <td>
                              <span className="project-category">
                                Category:
                              </span>{" "}
                              {project.category}
                            </td>
                            <td>
                              <span className="project-pri">Priority:</span>{" "}
                              {project.priority}
                            </td>
                            <td>
                              <span className="project-dept">Dept:</span>{" "}
                              {project.department}
                            </td>
                            <td>
                              <span className="project-loc">Location:</span>{" "}
                              {project.location}
                            </td>
                            <td>
                              <span className="project-status">Status:</span>{" "}
                              <p className="status-value"> {project.status}</p>
                            </td>
                            <td>
                              <div className="button-container">
                                {/* Add buttons to change project status */}

                                {/* Add buttons to change project status */}
                                <button
                                  className={`btns btns-start ${
                                    project.status === "close" ||
                                    project.status === "cancel"
                                      ? "disabled"
                                      : ""
                                  }`}
                                  onClick={() =>
                                    handleUpdateStatus(project._id, "running")
                                  }
                                  disabled={
                                    project.status === "close" ||
                                    project.status === "cancel"
                                  }
                                >
                                  Start
                                </button>
                                <button
                                  className={`btns btns-close ${
                                    project.status === "cancel"
                                      ? "disabled"
                                      : ""
                                  }`}
                                  onClick={() =>
                                    handleUpdateStatus(project._id, "close")
                                  }
                                  disabled={project.status === "cancel"}
                                >
                                  Close
                                </button>
                                <button
                                  className={`btns btns-cancel ${
                                    project.status === "cancel"
                                      ? "disabled"
                                      : ""
                                  }`}
                                  onClick={() =>
                                    handleUpdateStatus(project._id, "cancel")
                                  }
                                  disabled={project.status === "cancel"}
                                >
                                  Cancel
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>No projects found.</tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </Fragment>
            )}
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="pagination-container">
        {currentPage > 1 && (
          <button
            className="pagination-button"
            onClick={() => handlePageChange(currentPage - 1)}
          >
            {"<"}
          </button>
        )}

        {Array.from(
          { length: Math.ceil(totalProjects / pageSize) },
          (_, index) => (
            <button
              className={`pagination-button ${
                index + 1 === currentPage ? "active" : ""
              }`}
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          )
        )}

        {currentPage < Math.ceil(totalProjects / pageSize) && (
          <button
            className="pagination-button"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            {">"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Project;
