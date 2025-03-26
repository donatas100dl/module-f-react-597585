import { LatLngExpression } from "leaflet";
import "../home.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useLocations } from "../utils/context/locationContext";
import "leaflet/dist/leaflet.css";
import { Star } from "lucide-react";
import { useEffect, useState, MouseEvent } from "react";

import MarkerCustom from "../components/Marker";
import ReviewOverlay from "../components/reviewOverlay";

interface LocatinType {
  _id: string;
  name: string;
  latitude: number;
  rating: number;
  longitude: number;
  position?: LatLngExpression;
}

const HomePage = () => {
  const { locations } = useLocations();
  const [mapLocations, setMapLocations] = useState<LocatinType[]>();
  const [center, setCenter] = useState<LatLngExpression>([51.505, -0.09]);
  const [showPopup, setShowPopup] = useState(false);
  const [curentLocation, setCurentLocation] = useState<LocatinType>();
  useEffect(() => {
    if (locations && locations.length > 0) {
      console.log("locations", locations);
      setMapLocations(locations);
      setCenter([locations[9]?.latitude, locations[9]?.longitude]);
    }
  }, [locations]);

  const handleClick = (location: LocatinType) => {
    console.log("location", location);
    setShowPopup(!showPopup);
    setCurentLocation(location);
  };
  if (!mapLocations) {
    return <span>Loading...</span>;
  }

  return (
    <>
      <span>Home Page</span>
      <MapContainer
        center={center}
        zoom={8}
        scrollWheelZoom={false}
        className="map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map((location: LocatinType) => (
          <Marker
            position={[Number(location.latitude), Number(location.longitude)]}
            key={location._id}
            eventHandlers={{
              click: () => {
                handleClick(location);
              },
            }}
          >
            <MarkerCustom
              rating={location.rating}
              name={location.name}
              key={location._id}
            />
          </Marker>
        ))}
      </MapContainer>
      {showPopup ? (
        <ReviewOverlay
          id={curentLocation ? curentLocation._id : "67e3d0db14bf3bb3b3f57efc"}
        />
      ) : null}
    </>
  );
};

export default HomePage;
