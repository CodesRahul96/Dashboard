// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useAuth } from '../../store/auth';

function Chart() {
  const {API} = useAuth();
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetch(`${API}/api/chartdata`)
      .then((response) => response.json())
      .then((data) => setChartData(data))
      .catch((error) => console.error('Error fetching chart data:', error));
  }, []);

  const chartOptions = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Department-wise Project Details',
    },
    xAxis: {
      categories: chartData.map((item) => item.department),
    },
    yAxis: {
      title: {
        text: 'Counts',
      },
    },
    series: [
      {
        name: 'Total Projects',
        data: chartData.map((item) => item.totalProjects),
      },
      {
        name: 'Closed Projects',
        data: chartData.map((item) => item.totalClosed),
      },
    ],
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <div id="departmentChart" style={{ height: '400px' }}>
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      </div>
    </div>
  );
}

export default Chart;
