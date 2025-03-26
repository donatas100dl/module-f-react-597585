import { Star } from "lucide-react";
import React from "react";
import "../home.css";

const Review = ({ rating, user_name, content }: any) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{user_name}</h5>
        <p className="card-text">{content}</p>
        <span className="rating">
          <Star />
          <span>Rating: {rating}</span>
        </span>
      </div>
    </div>
  );
};

export default Review;
