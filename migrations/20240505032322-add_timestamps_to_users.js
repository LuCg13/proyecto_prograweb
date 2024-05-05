"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("users", "createdAt", {
      allowNull: false,
      type: Sequelize.DATE,
    });
    await queryInterface.addColumn("users", "updatedAt", {
      allowNull: false,
      type: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("users", "createdAt");
    await queryInterface.removeColumn("users", "updatedAt");
  },
};
