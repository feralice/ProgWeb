'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('Usuarios', {
      fields: ['cursoId'],
      type: 'foreign key',
      name: 'curso_usuario_fk',
      references: {
        table: 'Cursos',
        field: 'id',
      },
      onDelete: 'restrict',
      onUpdate: 'restrict',
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Usuarios', 'curso_usuario_fk');
  }
};
