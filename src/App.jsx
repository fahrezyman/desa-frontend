import { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Homepage from "./components/pages/Homepage";
import SAWProcess from "./components/pages/SawProcess";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Homepage onLoginSuccess={handleLoginSuccess} />}
        />
        {isLoggedIn ? (
          <Route path="/saw-process" element={<SAWProcess />} />
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;
