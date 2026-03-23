// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Trip from "./pages/Trip";
import About from "./pages/About";
import Layout from "./components/Layout";
import { TripContextProvider } from "./context/TripContext";

function App() {
  return (
    <TripContextProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/trip" element={<Trip />} />
            <Route path="/about" element={<About />} />
          </Route>
        </Routes>
      </Router>
    </TripContextProvider>
  );
}

export default App; // ✅ default export
