"use strict";
const { v4 } = require("uuid");

// Password = "password" with bcrypt hash factor 10

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "Managers",
      [
        {
          id: v4(),
          name: "Super Admin",
          username: "superadmin2022",
          password:
            "$2y$10$/Ak2oFXaKLo1xaZ4J4AjGu/RV7eOb.AljcQWTmdxaUEVdAkzK0kny",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Managers", null, {});
  },
};
