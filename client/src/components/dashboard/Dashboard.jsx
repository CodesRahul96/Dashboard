// src/components/Dashboard.js
import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useAuth } from "../../store/auth";

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
    const mockData = [ ...project ];

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
        text: "Total and Closed Projects by Department",
      },
      xAxis: {
        categories: Object.keys(departmentCounts),
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
    <div>
      <h2>Dashboard</h2>
      <div className="counters">
        <div>Total Projects: {counterData.totalProjects}</div>
        <div>Closed Projects: {counterData.closedProjects}</div>
        <div>Running Projects: {counterData.runningProjects}</div>
        <div>Canceled Projects: {counterData.canceledProjects}</div>
        <div>Closure Delay Projects: {counterData.closureDelayProjects}</div>
      </div>
      <div className="chart mt-3">
        {projectData.length > 0 ? renderChart() : <p>Loading data...</p>}
      </div>
    </div>
  );
}

export default Dashboard;
