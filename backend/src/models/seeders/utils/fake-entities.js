const { v4 } = require("uuid");
const { randomizeTrait, fakeEntityArray } = require("./seed-helper");
const { Sequelize } = require("sequelize");

const fakeBikeLots = [
  {
    id: v4(),
    geom: "POINT(49.263903 -123.2094624)",
    lotName: "Fire Bikes",
    createdAt: new Date(),
    updatedAt: new Date(),
    address: {
      city: "Vancouver",
      street: "123 Fire Lane",
      postalCode: "V1V1V1",
      country: "CA",
      province: "BC",
    },
  },
  {
    id: v4(),
    geom: "POINT(49.285923 -123.115219)",
    lotName: "Water Bikes",
    createdAt: new Date(),
    updatedAt: new Date(),
    address: {
      city: "Vancouver",
      street: "123 Water Lane",
      postalCode: "V1V1V1",
      country: "CA",
      province: "BC",
    },
  },
  {
    id: v4(),
    geom: "POINT(49.244247 -122.966747)",
    lotName: "Earth Bikes",
    createdAt: new Date(),
    updatedAt: new Date(),
    address: {
      city: "Burnaby",
      street: "123 Earth Lane",
      postalCode: "V1V1V1",
      country: "CA",
      province: "BC",
    },
  },
  {
    id: v4(),
    geom: "POINT(49.285550 -122.792840)",
    lotName: "Air Bikes",
    createdAt: new Date(),
    updatedAt: new Date(),
    address: {
      city: "Vancouver",
      street: "123 Air Lane",
      postalCode: "V1V1V1",
      country: "CA",
      province: "BC",
    },
  },
  {
    id: v4(),
    geom: "POINT(49.163527 -122.846489)",
    lotName: "Mud Bikes",
    createdAt: new Date(),
    updatedAt: new Date(),
    address: {
      city: "Vancouver",
      street: "123 Mud Lane",
      postalCode: "V1V1V1",
      country: "CA",
      province: "BC",
    },
  },
];

const colors = ["Red", "Black", "White", "Blue", "Grey", "Yellow"];
const models = ["Contend", "Propel", "Mountain", "Cypress", "Revolt"];

const fakeBikes = fakeEntityArray(35, () => {
  return {
    id: v4(),
    bikeLotId: randomizeTrait(fakeBikeLots).id,
    model: randomizeTrait(models),
    color: randomizeTrait(colors),
    available: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
});

const userNames = [
  "member1",
  "member2",
  "member3",
  "member4",
  "member5",
  "member6",
  "member7",
  "member8",
  "member9",
  "member10",
];
const fakeUsers = userNames.map((username, i) => {
  return {
    id: v4(),
    username,
    name: `Name ${username}`,
    password: "$2b$10$.DQWFymkQWTo9bgFkW9aQ.ww6yqf2ykWAW1g9Kr4HliyZc7YrOEm.", // password
    role: "Member",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
});

const now = new Date();
const addHour = now.setHours(now.getHours() + 1);
const fakeReservations = fakeEntityArray(10, () => {
  return {
    id: v4(),
    userId: randomizeTrait(fakeUsers).id,
    bikeId: randomizeTrait(fakeBikes).id,
    startTime: new Date(),
    endTime: new Date(addHour),
    status: "Active",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
});

const ratings = [1, 2, 3, 4, 5];

const fakeReviews = [];
const bikeReviews = {};
fakeReservations.forEach((reservation) => {
  const reviewKey = `${reservation.userId}:${reservation.bikeId}`;
  if (!bikeReviews[reviewKey]) {
    const review = {
      id: v4(),
      bikeId: reservation.bikeId,
      userId: reservation.userId,
      rating: randomizeTrait(ratings),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    fakeReviews.push(review);
  }
});

module.exports = {
  fakeBikes,
  fakeReservations,
  fakeReviews,
  fakeUsers,
  fakeBikeLots,
};
