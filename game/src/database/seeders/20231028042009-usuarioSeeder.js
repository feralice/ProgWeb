'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Usuarios', [
      {
        nome: 'Fernanda Alice',
        senha: 'fernanda',
        email: 'fernanda@example.com',
        cursoId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Davi',
        senha: 'davi',
        email: 'davi@example.com',
        cursoId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Usuarios', null, {});
  }
};