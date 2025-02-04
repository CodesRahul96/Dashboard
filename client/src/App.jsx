import { BrowserRouter as Router } from "react-router-dom";

import MainContent from "./components/MainContent";
import Sidebar from "./components/sidebar/Sidebar";
import { useAuth } from "./store/auth";
import { Login } from './pages/Login/Login';


function App() {
  const { isLoggedIn, user } = useAuth();

  return (
    <Router>
      <div className="app">
        {isLoggedIn || user.isAdmin ? (
          <>
            <Sidebar />
            <MainContent />
          </>
        ) : (
          <>
            <Login />
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
