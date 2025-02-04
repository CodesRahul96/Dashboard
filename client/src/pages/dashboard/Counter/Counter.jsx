import React, { useEffect, useState } from "react";
import { useAuth } from "../../../store/auth";

const Counter = () => {
  const { URI } = useAuth();
  const [counterData, setCounterData] = useState({});

  const getCounters = async () => {
    try {
      const response = await fetch(`${URI}/api/counters`, {
        method: "POST",
      });
      if (response.ok) {
        // console.log(response);
        const data = await response.json();
        console.log("Counters data", data);
        setCounterData(data);
      }
    } catch (error) {
      console.log(`Fetching Services from server: ${error}`);
    }
  };

  useEffect(() => {
    getCounters();
  }, []);

  return (
    <div>
      {/* Dashboard Counters */}
      <div className="dashContainer">
        <div className="counters-container">
          <div className="counters">
            {/* counter */}
            <div className="counter d-flex">
              <span className="total-projects">Total Project</span>
              <span className="total-projects-count">
                {counterData.totalProjects}
              </span>
            </div>
            <div className="counter d-flex">
              <span className="total-projects">Closed</span>
              <span className="total-projects-count">
                {counterData.closedProjects}
              </span>
            </div>
            <div className="counter d-flex">
              <span className="total-projects">Running</span>
              <span className="total-projects-count">
                {counterData.runningProjects}
              </span>
            </div>
            <div className="counter d-flex">
              <span className="total-projects">Canceled</span>
              <span className="total-projects-count">
                {counterData.canceledProjects}
              </span>
            </div>
            <div className="counter d-flex">
              <span className="total-projects">Closure Delay</span>
              <span className="total-projects-count">
                {counterData.closureDelayProjects}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Counter;
