"use strict";
const { v4 } = require("uuid");
const { randomizeTrait, fakeEntityArray } = require("./utils/seed-helper");

const colors = ["red", "black", "white", "blue"];
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

const fakeBikes = fakeEntityArray(100, () => {
  return {
    id: v4(),
    model: randomizeTrait(models),
    color: randomizeTrait(colors),
    location: randomizeTrait(location),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
});

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Bikes", fakeBikes, {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Bikes", null, {});
  },
};
