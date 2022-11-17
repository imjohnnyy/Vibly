import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          {/* Wrapping the Home page with ProtectedRoute component such that only the
          authorized users (logged in users) can access the home page. If the token that are
          already stored in the local storage, then the user will be sent to the Home page.
          If the token is invalid, then the user will be sent to the login page   */}
          <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>} />  

          {/* Wrapping the Login and Register pages with PublicRoute component, such that if the valid
          user (already logged in) tries to navigate to the Login and Register pages, they will be redirected
          back the their Home page */}
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />

          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
