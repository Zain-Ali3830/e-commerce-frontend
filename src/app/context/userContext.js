'use client'
import React, { useState, useEffect } from "react";
import axios from "axios";
import { createContext, useContext } from "react";
export const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [profileData, setProfileData] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/profile/getprofile", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setProfileData(response.data);
        console.log("Profile data fetched:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
      }); 
  }, []);

  return (
    <UserContext.Provider value={{ profileData, setProfileData }}>
      {children}
    </UserContext.Provider>
  );
};

