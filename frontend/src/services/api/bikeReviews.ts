import { AxiosResponse } from "axios";
import { TBikeReviewModel } from "../../types/entities.type";
import client from "./baseClient";

const read = async (input: {
  headers: { Authorization: string };
}): Promise<Array<TBikeReviewModel>> => {
  const reviews: AxiosResponse<Array<TBikeReviewModel>> = await client.get(
    "/reviews",
    {
      headers: input.headers,
    }
  );
  return reviews.data;
};

const readById = async (input: {
  id: string;
  headers: { Authorization: string };
}): Promise<TBikeReviewModel> => {
  const review: AxiosResponse<TBikeReviewModel> = await client.get(
    `/reviews/${input.id}`,
    {
      headers: input.headers,
    }
  );
  return review.data;
};

const create = async (input: {
  body: Pick<TBikeReviewModel, "rating" | "bikeId">;
  headers: { Authorization: string };
}): Promise<TBikeReviewModel> => {
  const reservation: AxiosResponse<TBikeReviewModel> = await client.post(
    `/bikes/${input.body.bikeId}/reviews`,
    {
      rating: input.body.rating,
    },
    {
      headers: input.headers,
    }
  );
  return reservation.data;
};

const edit = async (input: {
  id: string;
  body: Omit<TBikeReviewModel, "userId">;
  headers: { Authorization: string };
}): Promise<void> => {
  await client.put(
    `/bikes/${input.body.bikeId}/reviews/${input.id}`,
    {
      rating: input.body.rating,
    },
    {
      headers: input.headers,
    }
  );
};

export default {
  read,
  readById,
  create,
  edit,
};
