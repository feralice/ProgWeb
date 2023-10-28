'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const cursosData = [
      {
        sigla: 'ES',
        nome: 'Engenharia de Software',
        descricao: 'Curso dos profs tops',
        areaId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sigla: 'MV',
        nome: 'Medicina Veterinária',
        descricao: 'cuidar de animalzinhosss',
        areaId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sigla: 'H',
        nome: 'História',
        descricao: 'história top',
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
