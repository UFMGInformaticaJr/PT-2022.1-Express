const sequelize = require('../database');
const {DataTypes} = require('sequelize');

const Jogo = sequelize.define('Jogos', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  preco: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  genero: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Jogo;
