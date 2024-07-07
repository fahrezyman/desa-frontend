import Homepage from "./components/pages/Homepage";
import AddAlternative from "./components/pages/AddAlternative";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/AddAlternative" element={<AddAlternative />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
