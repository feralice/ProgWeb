'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const cursosData = [
      {
        sigla: 'ES',
        nome: 'Engenharia de Software',
        descricao: 'Descrição da Engenharia de Software',
        areaId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sigla: 'MV',
        nome: 'Medicina Veterinária',
        descricao: 'Descrição da Medicina Veterinária',
        areaId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sigla: 'H',
        nome: 'História',
        descricao: 'Descrição de História',
        areaId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    await queryInterface.bulkInsert('Cursos', cursosData, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Cursos', null, {});
  }
};
