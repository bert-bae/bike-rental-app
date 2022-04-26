const { v4 } = require("uuid");
const { randomizeTrait, fakeEntityArray } = require("./seed-helper");

const colors = ["Red", "Black", "White", "Blue", "Grey", "Yellow"];
const models = ["Contend", "Propel", "Mountain", "Cypress", "Revolt"];
const location = [
  "Vancouver",
  "Burnaby",
  "Coquitlam",
  "Port Moody",
  "Port Coquitlam",
  "Surrey",
  "Langley",
  "Abbotsford",
  "Squamish",
  "Whistler",
  "Richmond",
];

const fakeBikes = fakeEntityArray(40, () => {
  return {
    id: v4(),
    model: randomizeTrait(models),
    color: randomizeTrait(colors),
    location: randomizeTrait(location),
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

const fakeReservations = fakeEntityArray(100, () => {
  return {
    id: v4(),
    userId: randomizeTrait(fakeUsers).id,
    bikeId: randomizeTrait(fakeBikes).id,
    startTime: new Date().toISOString(),
    endTime: new Date().toISOString(),
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
};
