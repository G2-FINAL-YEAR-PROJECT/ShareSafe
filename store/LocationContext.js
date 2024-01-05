import { createContext, useContext, useState, useEffect } from "react";
import * as TaskManager from "expo-task-manager";
import {
  requestLocationPermission,
  fetchAddress,
  stopBackgroundTracking,
} from "../services";

import { apiClient } from "../config";

const LocationContext = createContext();

const LocationProvider = ({ children }) => {
  const [currentPosition, setCurrentPosition] = useState({});
  const [currentLocation, setCurrentLocation] = useState([]);

  TaskManager.defineTask("backgroundLocationUpdates", ({ data, error }) => {
    if (error) {
      console.log("TaskManager error");
      return;
    }

    // Process location data
    const { locations } = data;
    const {
      coords: { latitude, longitude },
    } = locations[0];
    // console.log("++++ Background location update:", { latitude, longitude });
    setCurrentPosition({ lat: latitude, lon: longitude });
  });

  useEffect(() => {
    requestLocationPermission();

    return () => {
      stopBackgroundTracking();
    };
  }, []);

  useEffect(() => {
    if (currentPosition) {
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
