import "./dashboard.css";
import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useAuth } from "../../store/auth";
import { Link } from "react-router-dom";
import BackButton from "../../assets/back-arrow.svg";
import Logo from "../../assets/Logo.svg";
import Logout from "../../assets/Logout.svg";


function Dashboard() {
  const [projectData, setProjectData] = useState([]);

  const [counterData, setCounterData] = useState({
    totalProjects: 0,
    closedProjects: 0,
    runningProjects: 0,
    canceledProjects: 0,
    closureDelayProjects: 0,
  });

  const { project } = useAuth();
  console.log("Dashboard", project);

  useEffect(() => {
    const mockData = [...project];

    setProjectData(mockData);

    // Calculate counters based on project statuses
    const counters = {
      totalProjects: mockData.length,
      closedProjects: mockData.filter((project) => project.status === "Closed")
        .length,
      runningProjects: mockData.filter(
        (project) => project.status === "Running"
      ).length,
      canceledProjects: mockData.filter(
        (project) => project.status === "Canceled"
      ).length,
      closureDelayProjects: mockData.filter(
        (project) => project.status === "Closure delay"
      ).length,
    };

    setCounterData(counters);
  }, [project]);

  const renderChart = () => {
    const departmentCounts = {};

    projectData.forEach((project) => {
      const department = project.department;

      if (!departmentCounts[department]) {
        departmentCounts[department] = { total: 0, closed: 0 };
      }

      departmentCounts[department].total += 1;

      if (project.status === "Closed") {
        departmentCounts[department].closed += 1;
      }
    });

    const chartOptions = {
      chart: {
        type: "column",
      },
      title: {
        text: "",
      },
      xAxis: {
        categories: Object.keys(departmentCounts).map((department) => {
          // Abbreviate department names
          const abbreviations = {
            finance: "FIN",
            quality: "QLT",
            maintenance: "MAN",
            stores: "STO",
            startegy: "STR",
            // Add more department abbreviations as needed
          };
          return abbreviations[department] || department;
        }),
        title: {
          text: "Department",
        },
      },
      yAxis: {
        title: {
          text: "Project Count",
        },
      },
      series: [
        {
          name: "Total Projects",
          data: Object.values(departmentCounts).map((counts) => counts.total),
        },
        {
          name: "Closed Projects",
          data: Object.values(departmentCounts).map((counts) => counts.closed),
        },
      ],
    };

    return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
  };

  return (
    <div className="dashboard">
      <div className="topbarContainer">
        <div className="topbarContent">
          <Link to="/projects" className="backButton">
            <img src={BackButton} alt="back" />
          </Link>
          <h2>Dashboard</h2>
          <div className="logo">
            <img src={Logo} alt="logo" />
          </div>
          <div className="crateLogout">
            <Link to="/logout">
              <img src={Logout} alt="Logout" />
            </Link>
          </div>
        </div>
        <div className="counters mb-4">
          <div
            className="counter"
            style={{ borderLeft: "4px solid #3498db", paddingLeft: "10px" }}
          >
            <div>
              <h5>Total Project</h5> <h1>{counterData.totalProjects}</h1>
            </div>
          </div>
          <div
            className="counter"
            style={{ borderLeft: "4px solid #3498db", paddingLeft: "10px" }}
          >
            <div>
              <h5>Closed</h5> <h1>{counterData.closedProjects}</h1>
            </div>
          </div>
          <div
            className="counter"
            style={{ borderLeft: "4px solid #3498db", paddingLeft: "10px" }}
          >
            <div className="conterItems">
              <h5>Running</h5> <h1>{counterData.runningProjects}</h1>
            </div>
          </div>
          <div
            className="counter"
            style={{ borderLeft: "4px solid #3498db", paddingLeft: "10px" }}
          >
            <div>
              <h5>Canceled</h5> <h1>{counterData.canceledProjects}</h1>
            </div>
          </div>
          <div
            className="counter"
            style={{ borderLeft: "4px solid #3498db", paddingLeft: "10px" }}
          >
            <div>
              <h5>Closure Delay</h5>
              <h1>{counterData.closureDelayProjects}</h1>
            </div>
          </div>
        </div>
        <div className="container-fluid chart-container mb-3">
          <h3>Department wise - Total Vs Closed</h3>
          <div className="chart mt-3">
            {projectData.length > 0 ? renderChart() : <p>Loading data...</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
