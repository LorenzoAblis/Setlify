import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Templates from "./pages/templates/Templates";
import Exercises from "./pages/exercises/Exercises";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Templates />} />
          <Route path="/exercises" element={<Exercises />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
