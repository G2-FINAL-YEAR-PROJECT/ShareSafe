// const requestLocationPermission = async () => {
//   try {
//     const { status } = await Location.requestForegroundPermissionsAsync();

//     if (status === "granted") {
//       const { status } = await Location.requestBackgroundPermissionsAsync();
//       if (status === "granted") {
//         setLocationGranted(true);
//       } else {
//         setLocationGranted(false);
//         showLocationPermissionAlert();
//       }
//     } else {
//       setLocationGranted(false);
//       showLocationPermissionAlert();
//     }
//   } catch (error) {
//     setLocationGranted(false);
//     showLocationPermissionAlert();
//   }
// };

// const showLocationPermissionAlert = () => {
//   Alert.alert(
//     "Location Permission Required",
//     'To receive emergency notifications, please choose "Allow all the time" for location access. Open app settings to update your preferences.',
//     [
//       {
//         text: "Cancel",
//         style: "cancel",
//       },
//       {
//         text: "Open Settings",
//         onPress: () => Linking.openSettings(),
//       },
//     ],
//     { cancelable: false }
//   );
// };

// TaskManager.defineTask("backgroundLocationUpdates", ({ data, error }) => {
//   if (error) {
//     console.log("TaskManager error");
//     return;
//   }

//   // Process location data
//   const { locations } = data;
//   const {
//     coords: { latitude, longitude },
//   } = locations[0];
//   console.log("Background location update:", locations);
//   setCurrentLocation({ longitude, latitude });
// });

// useEffect(() => {
//   if (locationGranted) {
//     // Start background tracking when component mounts
//     startBackgroundTracking();

//     // Cleanup function to stop background tracking when component unmounts
//     return () => {
//       stopBackgroundTracking();
//     };
//   }
// }, []);

// const startBackgroundTracking = async () => {
//   await Location.startLocationUpdatesAsync("backgroundLocationUpdates", {
//     accuracy: Location.Accuracy.High,
//     timeInterval: 2000, // Update every 60 seconds
//     distanceInterval: 0,
//     showsBackgroundLocationIndicator: true, // Show location icon in status bar
//   });
// };

// const stopBackgroundTracking = async () => {
//   await Location.stopLocationUpdatesAsync("backgroundLocationUpdates");
// };

// const fetchAddress = async () => {
//   const { longitude, latitude } = currentLocation;

//   try {

//     const { data } = await axios.get(
//       `${locationBaseUrl}?lat=${latitude}&lon=${longitude}&api_key=${API_KEY}`
//     );

//     console.log("address", data);
//   } catch (error) {
//     console.log("error", error);
//   }
// };

// useEffect(() => {
//   if (currentLocation) {
//     // update backend with users current coordinates
//   }
// }, [currentLocation]);
