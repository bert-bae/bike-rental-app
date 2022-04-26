"use strict";
const { v4 } = require("uuid");
const {
  fakeBikes,
  fakeReservations,
  fakeReviews,
  fakeUsers,
} = require("./utils/fake-entities");

module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.bulkInsert("Users", fakeUsers, {});
    queryInterface.bulkInsert("Bikes", fakeBikes, {});
    queryInterface.bulkInsert("Reservations", fakeReservations, {});
    queryInterface.bulkInsert("BikeReviews", fakeReviews, {});
  },

  async down(queryInterface, Sequelize) {
    queryInterface.bulkDelete("Bikes", null, {});
    queryInterface.bulkInsert("Users", null, {});
    queryInterface.bulkInsert("Reservations", null, {});
    queryInterface.bulkInsert("BikeReviews", null, {});
  },
};
