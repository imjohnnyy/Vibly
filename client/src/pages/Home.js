import React, { useState, useEffect } from "react";
import axios from "axios";

function Home() {
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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData(); // Invokes the getUserData function every time the page renders
  }, []);


  return  <div className="flex item-center justify-center h-screen">
      <h1 className="text=5xl">{userData?.name}</h1>
      {/* If the user is present then their name will be displayed */}
    </div>;
  
}
export default Home;
