export type TBikeReviewModel = {
  id: string;
  bike_id: string;
  user_id: string;
  rating: string;
};

export type TBikeModel = {
  id: string;
  model: string;
  color: string;
  location: string;
};

export enum UserRoleEnum {
  Admin = "Admin",
  Member = "Member",
}

export type TUserModel = {
  id: string;
  name: string;
  username: string;
  password: string;
  role: UserRoleEnum;
};

export enum ReservationStatusEnum {
  Active = "Active",
  Cancelled = "Cancelled",
}

export type TReservationModel = {
  user_id: string;
  bike_id: string;
  start_time: string;
  end_time: string;
  status: ReservationStatusEnum;
};
