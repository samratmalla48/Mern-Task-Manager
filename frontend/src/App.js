import "bootstrap/dist/css/bootstrap.min.css";
import { Home } from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import BrowserRouter

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          
          {/* Add other routes here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;