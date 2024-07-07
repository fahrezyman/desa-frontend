import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Calculator from "./components/pages/Calculator";
import Homepage from "./components/pages/Homepage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/app" element={<Calculator />} />
      </Routes>
    </Router>
  );
};

export default App;
