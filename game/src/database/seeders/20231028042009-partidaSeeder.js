'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Partidas', [
      {
        userId: 1,
        pontuacao: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        pontuacao: 300,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Partidas', null, {});
  }
};
