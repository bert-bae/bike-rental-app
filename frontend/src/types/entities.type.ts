export type TBikeReviewModel = {
  id: string;
  bikeId: string;
  userId: string;
  rating: number;
};

export type TBikeModel = {
  id: string;
  bikeLotId: string;
  model: string;
  color: string;
  rating: number;
  available: boolean;
} & {
  location?: TBikeLotsModel;
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
  id: string;
  userId: string;
  bikeId: string;
  startTime: string;
  endTime: string;
  status: ReservationStatusEnum;
};

export type TBikeLotsModel = {
  id: string;
  lotName: string;
  address: Record<string, any>;
  geom: {
    type: "Point";
    coordinates: [string, string];
  };
};
