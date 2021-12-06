import { Routes, Route, Link } from "react-router-dom";

import LoginPage from "./pages/login"
import SignupPage from "./pages/signup"
import DashboardPage from "./pages/dashboard"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </div>
  );
}

export default App;
