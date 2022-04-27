"use strict";
const {
  fakeBikes,
  fakeBikeLots,
  fakeReservations,
  fakeReviews,
  fakeUsers,
} = require("./utils/fake-entities");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", fakeUsers, {});
    await queryInterface.bulkInsert(
      "BikeLots",
      fakeBikeLots,
      {},
      { address: { type: new Sequelize.JSON() } }
    );
    await queryInterface.bulkInsert("Bikes", fakeBikes, {});
    await queryInterface.bulkInsert("Reservations", fakeReservations, {});
    await queryInterface.bulkInsert("BikeReviews", fakeReviews, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("BikeLots", null, {});
    await queryInterface.bulkDelete("Bikes", null, {});
    await queryInterface.bulkDelete("Users", null, {});
    await queryInterface.bulkDelete("Reservations", null, {});
    await queryInterface.bulkDelete("BikeReviews", null, {});
  },
};
