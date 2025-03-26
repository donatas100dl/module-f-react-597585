import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [locationLoading, setLocationLoading] = useState(true);
  const [token, setToken] = useState(Cookies.get("token"));
  const [locations, setLocations] = useState([]);
  const url = "https://konkursas.kitm.lt/backend/995975/api/v1/places/";

  useEffect(() => {
    getLocations();
  }, []);

  async function getLocations() {
    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        setLocations(response.data.data);
        setLocationLoading(false);
      }
    } catch (error) {
      console.log("err", error);
    }
  }
  async function getReviews(place_id) {
    try {
      const response = await axios.get(url + place_id + "/reviews");

      console.log("response", response);
      if (response.status === 200) {
        return response.data.data;
      }
    } catch (error) {
      console.log("err", error);
    }
  }
  async function newReview(place_id, reviewData) {
    try {
      const response = await axios.post(
        url + place_id + "/reviews",
        {
          user_name: reviewData.name,
          rating: reviewData.rating,
          comment: reviewData.comment,
        },
        {
          header: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("response", response);
      if (response.status === 200) {
        return response.data.data;
      }
    } catch (error) {
      console.log("err", error);
    }
  }

  const contextData = useMemo(
    () => ({
      getLocations,
      getReviews,
      newReview,
      locations,
    }),
    [locations, locationLoading]
  );

  return (
    <LocationContext.Provider value={contextData}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocations = () => {
  return useContext(LocationContext);
};

export default LocationContext;
