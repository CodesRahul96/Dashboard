import "./dashboard.css";
import { Link } from "react-router-dom";
import BackButton from "../../assets/back-arrow.svg";
import Logo from "../../assets/Logo.svg";
import Logout from "../../assets/Logout.svg";
import Counter from "./Counter/Counter";
import Chart from "./chart/Chart";

function Dashboard() {
  document.title = "Dashboard";
  return (
    <div className="dashboard">
      <div className="dash-bg"></div>
      {/* Topbar Content */}
      <div className="dashContent">
        <div className="dashName">
          <Link to="/" className="backButton">
            <img src={BackButton} alt="back" />
          </Link>
          <span className="name">Dashboard</span>
        </div>
        <div className="logoContainer">
          <img src={Logo} alt="logo" />
        </div>
        <div className="dashLogout">
          <Link to="/logout">
            <img src={Logout} alt="Logout" />
          </Link>
        </div>
      </div>

      {/* Dashboard Counters */}
      <Counter />

      {/* Chart */}
      <Chart />
    </div>
  );
}

export default Dashboard;
