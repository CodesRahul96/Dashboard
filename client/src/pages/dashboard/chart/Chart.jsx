import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useAuth } from "../../../store/auth";

const Chart = () => {
  const { URI } = useAuth();
  const [chartData, setChartData] = useState([]);

  const getChartData = async () => {
    try {
      const response = await fetch(`${URI}/api/chart`, {
        method: "POST",
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Chart data", data);
        setChartData(data);
      }
    } catch (error) {
      console.log(`Fetching Services from server: ${error}`);
    }
  };

  useEffect(() => {
    getChartData();
  }, []);

  const renderChart = () => {
    if (!chartData || Object.keys(chartData).length === 0) {
      return <p>No data available</p>;
    }

    // Mapping object for department name transformation
    const departmentMapping = {
      finance: "FIN",
      maintenance: "MAN",
      stores: "STO",
      quality: "QLT",
      strategy: "STR",
    };

    // Transform and filter the chart data
    const transformedChartData = Object.keys(chartData).reduce((acc, department) => {
      const transformedDepartment = departmentMapping[department.toLowerCase()];
      if (transformedDepartment) {
        acc[transformedDepartment] = chartData[department];
      }
      return acc;
    }, {});

    const chartOptions = {
      chart: {
        type: "column",
      },
      title: {
        text: "",
      },
      xAxis: {
        categories: Object.keys(transformedChartData),
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
          name: "Total",
          data: Object.values(transformedChartData).map((counts) => counts.total),
        },
        {
          name: "Closed",
          data: Object.values(transformedChartData).map((counts) => counts.closed),
        },
      ],
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 200,
              maxHeight: 100,
            },
            chartOptions: {
              legend: {
                enabled: false,
              },
            },
          },
        ],
      },
    };

    return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
  };

  return (
    <div>
      <div className="chart-container">
        <span className="department-wise">
          Department wise - Total Vs Closed
        </span>
        <div className="chart">
          <div className="chart-box">
            {Object.keys(chartData).length > 0 ? (
              renderChart()
            ) : (
              <p>Loading data...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chart;
