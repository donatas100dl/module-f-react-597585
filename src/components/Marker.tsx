import { Star } from "lucide-react";
import React from "react";
import { Popup } from "react-leaflet";
import "../home.css";

const Marker = ({ rating, name }: any) => {
  return (
    <Popup>
      <div className="popup">
        <span>{name}</span>
        <div>
          <Star />
          <span>
            Rating: <p>{rating}</p>
          </span>
        </div>
      </div>
    </Popup>
  );
};

export default Marker;
