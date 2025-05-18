import { useRef } from "react";
import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
function GoogleMap() {

    const mapRef = useRef(null);

  // Example location: Paris
  const position = { lat: 48.8566, lng: 2.3522 };

  // Create a custom control for the location label
  const createLocationControl = (map) => {
    const controlDiv = document.createElement("div");
    controlDiv.style.backgroundColor = "#fff";
    controlDiv.style.border = "2px solid #fff";
    controlDiv.style.borderRadius = "3px";
    controlDiv.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
    controlDiv.style.margin = "10px";
    controlDiv.style.padding = "8px";
    controlDiv.style.fontFamily = "Roboto,Arial,sans-serif";
    controlDiv.style.fontSize = "14px";
    controlDiv.innerHTML = "Location: Paris"; // Customize as needed

    map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(controlDiv);
  };

  // Initialize the custom control when the map loads
  const handleMapLoad = (map) => {
    mapRef.current = map;
    createLocationControl(map);
  };

  return (
    <APIProvider apiKey={'AIzaSyATtOoUz9s9sVRmSj5VsN108mkrYaaWQ1Y'}>
      <div style={{ height: "100vh", width: "100%" }}>
        <Map
          defaultZoom={12}
          defaultCenter={position}
          gestureHandling="cooperative" // Enables scroll and pan
          onMapLoad={handleMapLoad}
          mapId="" // Optional: Create a Map ID in Google Cloud Console for custom styles
        >
          <AdvancedMarker position={position} />
        </Map>
      </div>
    </APIProvider>
  );
};

export default GoogleMap;
