"use strict";
const { v4 } = require("uuid");

// Password = "password" with bcrypt hash factor 10

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          id: v4(),
          name: "Super Admin",
          username: "superadmin2022",
          password:
            "$2y$10$/Ak2oFXaKLo1xaZ4J4AjGu/RV7eOb.AljcQWTmdxaUEVdAkzK0kny",
          role: "Admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
