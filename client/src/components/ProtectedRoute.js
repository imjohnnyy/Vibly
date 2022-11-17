import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//The protected route component allows only the
// authorized users (logged in users) to access the home page (look at App.js).
function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const [readyToRender, setReadyToRender] = useState(false);
  const [userData, setUserData] = useState(null);

  //Calling the 'get-user-data' api and sending the 'headers' which are the tokens in the form of authorization
  const getUserData = async () => {
    try {
      const response = await axios.post(
        "/api/users/get-user-data",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, //We will decode this authorization token in the backend,
          }, //If is successful, then data is sent to the UI from the backend
        }
      );
      if (response.data.success) {
        setUserData(response.data.data);
      } else {
        alert(response.data.message);
      }
      setReadyToRender(true);
    } catch (error) {
      setReadyToRender(true);
      navigate("/login");
      console.log(error);
    }
  };

  useEffect(() => {
    if (userData === null) {
      getUserData(); // Invokes the getUserData function every time the page renders
    }
  }, []);

  return (
    <div>
      {/* If readyToRender is true then we will display the children, else 'Loading' will be displayed */}
      {readyToRender ? children : <div>Loading...</div>}
    </div>
  );
}
export default ProtectedRoute;
