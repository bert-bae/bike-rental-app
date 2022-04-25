import React from "react";
import ReviewStars from "../../ReviewStars";
import Box from "@mui/material/Box";
import { TBikeReviewModel, TBikeModel } from "../../../types/entities.type";

type BikeReviewFormProps = {
  review?: TBikeReviewModel;
  onSubmit: (rating: number) => void;
};

const BikeForm: React.FC<BikeReviewFormProps> = ({ review, onSubmit }) => {
  return (
    <Box margin="16px 0">
      <ReviewStars
        value={review?.rating || 0}
        size={40}
        readonly={false}
        onRatingChange={(val) => onSubmit(val)}
      />
    </Box>
  );
};

export default BikeForm;
