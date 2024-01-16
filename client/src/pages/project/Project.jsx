import { useEffect, useState } from "react";
import ProjectsTable from "./ProjectsTable ";
import { useAuth } from "../../store/auth";

export const Project = () => {
  const { API } = useAuth();

  const [projectData, setProjectData] = useState([]);
  const [selectedPriority, setSelectedPriority] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 10;

  const fetchData = async () => {
    try {
      const response = await fetch(`${API}/api/projects`, {
        method: "POST",
      });

      if (response.ok) {
        const data = await response.json();
        setProjectData(data.msg);
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

  const handleSortByPriority = (priority) => {
    setSelectedPriority(priority.toLowerCase()); // Convert to lowercase for case-insensitive comparison
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const getFilteredData = () => {
    let filteredData = projectData;

    // Filter by priority
    if (selectedPriority !== "All") {
      filteredData = filteredData.filter(
        (project) => project.priority === selectedPriority
      );
    }

    // Filter by search query
    if (searchQuery.trim() !== "") {
      const lowerCaseQuery = searchQuery.toLowerCase();
      filteredData = filteredData.filter((project) =>
        project.projectName.toLowerCase().includes(lowerCaseQuery)
      );
    }

    return filteredData;
  };

  const priorityOptions = ["All", "High", "Medium", "Low"];

  useEffect(() => {
    fetchData();
  }, [projectData]);

  // Calculate which projects to display based on the current page
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = getFilteredData().slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  // Calculate page numbers for pagination links
  const pageNumbers = Array.from(
    { length: Math.ceil(getFilteredData().length / projectsPerPage) },
    (_, index) => index + 1
  );

  return (
    <div className="">
      <h2>Project Listing</h2>
      <div className="topTable">
        <div className="searchBox">
          <label htmlFor="searchInput"></label>
          <input
            placeholder="search"
            type="text"
            id="searchInput"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <div className="sortBox">
          <label htmlFor="priorityDropdown">Sort by Priority:</label>
          <select
            id="priorityDropdown"
            className="priorityItems"
            value={selectedPriority}
            onChange={(e) => handleSortByPriority(e.target.value)}
          >
            {priorityOptions.map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
        </div>
      </div>
      <ProjectsTable
        projectData={currentProjects}
        onUpdateStatus={handleUpdateStatus}
      />
      {/* Pagination Links */}
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
  );
};
