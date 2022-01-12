const sequelize = require('../database/');
const {DataTypes} = require('sequelize');
const Jogo = require('./Jogo');

const Usuario = sequelize.define('Usuarios', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Usuario.hasMany(Jogo, {
  onDelete: 'CASCADE'
});
Jogo.belongsTo(Usuario);

/*
  Comandos para criar/alterar as colunas da tabela caso necessário. Se for feita
  alguma alteração no modelo, mude 'alter' para true. Verifique se o modelo no
  banco foi alterado e, se não tiver funcionado, também mude 'force' para true.
*/
Usuario.sync({alter: false, force: false})
  .then(() => {
    console.log('Tabela Usuarios (re)criada');
  })
  .catch((err) => console.log(err));

Jogo.sync({alter: false, force: false})
  .then(() => {
    console.log('Tabela Jogos (re)criada');
  })
  .catch((err) => console.log(err));

module.exports = Usuario;
