import "./project.css";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../store/auth";
import ProjectsTable from "./../../components/ProjectTable/ProjectsTable ";
import { Link } from "react-router-dom";
import BackButton from "../../assets/back-arrow.svg";
import Logo from "../../assets/Logo.svg";
import Logout from "../../assets/Logout.svg";

export const Project = () => {
  const { API } = useAuth();

  const [projectData, setProjectData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortingCriteria, setSortingCriteria] = useState("");

  const projectsPerPage = 7;

  const fetchData = async () => {
    try {
      const response = await fetch(`${API}/api/projects`, {
        method: "POST",
      });

      if (response.ok) {
        const data = await response.json();
        setProjectData(data.msg);
        setOriginalData(data.msg);
      }
    } catch (error) {
      console.log(`Fetching Services from server: ${error}`);
    }
  };

  const handleUpdateStatus = async (projectId, newStatus) => {
    try {
      await fetch(`${API}/api/projects/${projectId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      // Fetch updated data after the status update
      await fetchData();
    } catch (error) {
      console.error("Error updating project status:", error);
    }
  };

  const handleSortBy = (criteria) => {
    if (sortingCriteria === criteria) {
      // Reverse the order if sorting by the same criteria
      setProjectData([...projectData].reverse());
    } else {
      // Sort the data based on the selected criteria
      const sortedData = [...projectData].sort((a, b) =>
        a[criteria].localeCompare(b[criteria])
      );
      setProjectData(sortedData);
    }

    setSortingCriteria(criteria);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Filter data based on searchQuery
    const filteredData = originalData.filter((project) =>
      Object.values(project).some(
        (value) =>
          value &&
          value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

    setProjectData(filteredData);
    setCurrentPage(1); // Reset current page when filtering
  }, [searchQuery]);

  // Pagination logic
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projectData.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  const pageNumbers = Array.from(
    { length: Math.ceil(projectData.length / projectsPerPage) },
    (_, index) => index + 1
  );

  return (
    <div className="ProjectDashboard">
      <div className="projectContainer">
      <div className="topbarContent">
        <Link to="/" className="backButton">
          <img src={BackButton} alt="back" />
        </Link>
        <h2>Project Listing</h2>
        <div className="logo">
          <img src={Logo} alt="logo" />
        </div>
        <div className="crateLogout">
            <Link to="/logout">
              <img src={Logout} alt="Logout" />
            </Link>
          </div>
        
      </div>

      <div className="topProjectContainer d-flex">
        <div className="topInputs">
          <div className="search">
            <label htmlFor="searchInput"></label>
            <input
              placeholder="Find Project"
              type="text"
              id="searchInput"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="sortingDropdown">Sort by: </label>
            <select
              id="sortingDropdown"
              value={sortingCriteria}
              onChange={(e) => handleSortBy(e.target.value)}
            >
              <option value="">-- Select criteria --</option>
              <option value="reason">Reason</option>
              <option value="department">Department</option>
              <option value="division">Division</option>
              <option value="priority">Priority</option>
              <option value="category">Category</option>
              <option value="location">Location</option>
            </select>
          </div>
        </div>

        <ProjectsTable
          className="projectTableBox"
          projectData={currentProjects}
          onUpdateStatus={handleUpdateStatus}
          width={100}
        />

        <div className="pagination-container">
          <ul className="pagination">
            {pageNumbers.map((number) => (
              <li
                key={number}
                className={number === currentPage ? "active" : ""}
                onClick={() => setCurrentPage(number)}
              >
                {number}
              </li>
            ))}
          </ul>
        </div>
      </div>
      </div>
    </div>
  );
};
