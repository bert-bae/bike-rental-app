import React from "react";
import ReactStars from "react-rating-stars-component";

type ReviewStarsProps = {
  value: number;
  size: number;
  readonly?: boolean;
  onRatingChange?: (value: number) => void;
};

const ReviewStars: React.FC<ReviewStarsProps> = ({
  size,
  value,
  readonly,
  onRatingChange,
}) => {
  return (
    <ReactStars
      value={value}
      count={5}
      onChange={onRatingChange}
      size={size}
      activeColor="#ffd700"
      half={false}
      edit={!readonly}
    />
  );
};

export default ReviewStars;
