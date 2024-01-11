import { createContext, useContext, useState, useEffect } from "react";
import { requestLocationPermission, fetchAddress } from "../services";
import { apiClient } from "../config";

const LocationContext = createContext();

const LocationProvider = ({ children }) => {
  const [currentPosition, setCurrentPosition] = useState({});
  const [currentLocation, setCurrentLocation] = useState([]);

  useEffect(() => {
    requestLocationPermission(setCurrentPosition);
  }, []);

  useEffect(() => {
    const updateUser = async () => {
      try {
        const data = await fetchAddress(currentPosition);

        const location = {
          position: {
            lon: currentPosition?.lon,
            lat: currentPosition?.lat,
          },
          name: data?.display_name,
        };

        setCurrentLocation([location]);
        //   console.log(location);

        const userAddress = {
          address: data?.display_name,
          latitude: currentPosition?.lat?.toString(),
          longitude: currentPosition?.lon?.toString(),
        };

        const res = await apiClient.put("/users/update", userAddress);

        if (res.data?.status !== 200) {
          throw new Error(res.data?.message);
        }
        // console.log(res.data);
      } catch (error) {
        console.log(error?.message);
      }
    };

    if (currentPosition?.lat) {
      updateUser();
    }
  }, [currentPosition]);

  return (
    <LocationContext.Provider value={{ currentLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

const useLocationContext = () => {
  const context = useContext(LocationContext);
  if (!context)
    throw new Error(
      "useLocationContext must be used within a LocationProvider"
    );
  return context;
};

export { LocationProvider, useLocationContext };
