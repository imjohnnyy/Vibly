import React , {useEffect} from "react";
import { useNavigate } from "react-router-dom";

// Check App.js for the purpose of this component
function PublicRoute({ children }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);
  return <div>{children}</div>;
}

export default PublicRoute;