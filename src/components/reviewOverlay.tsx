import { Star } from "lucide-react";
import React, { useEffect, useState } from "react";
import "../home.css";
import { useLocations } from "../utils/context/locationContext";
import { span } from "framer-motion/client";
import ReviewCard from "./reviwCard";

const ReviewOverlay = ({ id }: any) => {
  const { getReviews, newReview } = useLocations();
  const [locationRewies, setLocationReviews] = useState([]);
  const [reviewData, setReviewData] = useState({
    username: "",
    comment: "",
    rating: 1,
  });

  useEffect(() => {
    handleGetReviews();
  }, []);

  const handleGetReviews = async () => {
    if (id) {
      const reviews = await getReviews(id);
      setLocationReviews(reviews);
    }
  };

  const handleChange = (e: any) => {
    e.preventDefault();
    setReviewData({ ...reviewData, [e.target.name]: e.target.value });
    console.log(e.target.name, e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (reviewData.username && reviewData.comment) {
      console.log("reviewData", reviewData);
    }
    if (id) {
      newReview(id, reviewData);
    }
  };

  if (!locationRewies) {
    return <span>Loading...</span>;
  }

  return (
    <div className="body">
      <span>Reviwes:</span>
      {locationRewies.map((review: any) => (
        <ReviewCard
          key={review._id}
          user_name={review.user_name}
          rating={review.rating}
          content={review.content}
        />
      ))}
      <form action="submit">
        <input
          type="text"
          placeholder="username"
          name="username"
          value={reviewData.username}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="comment"
          name="comment"
          value={reviewData.comment}
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="ratting"
          min={1}
          max={5}
          name="rating"
          value={reviewData.rating}
          onChange={handleChange}
        />
      </form>
      <button onClick={handleSubmit}>Submit Review</button>
    </div>
  );
};
export default ReviewOverlay;
