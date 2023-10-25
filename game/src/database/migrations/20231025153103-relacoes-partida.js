'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('Partidas', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'partida_user_fk', 
      references: {
        table: 'Usuarios',
        field: 'id',
      },
      onDelete: 'restrict',
      onUpdate: 'restrict',
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Partidas', 'partida_user_fk');
  }
};
