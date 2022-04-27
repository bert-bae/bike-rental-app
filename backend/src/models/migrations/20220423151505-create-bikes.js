"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Bikes", {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      bikeLotId: {
        type: Sequelize.STRING,
        references: {
          model: "BikeLots",
          key: "id",
        },
      },
      available: {
        type: Sequelize.BOOLEAN,
        default: true,
      },
      model: {
        type: Sequelize.STRING,
      },
      color: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Bikes");
  },
};
