const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');

router.post('/', async (req, res) => {
  const body = req.body;
  const usuario = {
    nome: body.nome,
    email: body.email,
    senha: body.senha,
  }

  await Usuario.create(usuario);

  res.status(201).end();
});

router.get('/', async (req, res) => {
  const usuarios = await Usuario.findAll({
    // attributes é usado para escolher quais campos serão selecionados no banco de dados
    attributes: ['id', 'nome', 'email', 'createdAt'],
  });

  res.status(200).json(usuarios);
});

router.get('/:id', async (req, res) => {
  const usuario = await Usuario.findByPk(req.params.id, {
    attributes: ['id', 'nome', 'email', 'createdAt'],
  });

  res.status(200).json(usuario);
});

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const usuario = await Usuario.findByPk(id);
  if (!usuario) {
    res.status(400).send('Usuário não encontrado');
  }

  const body = req.body;
  // Não permitiremos a alteração de senha
  usuario.nome = body.nome || usuario.nome;
  usuario.email = body.email || usuario.email;
  
  await usuario.save();

  res.status(204).json();
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const usuario = await Usuario.findByPk(id);
  if (!usuario) {
    res.status(400).send('Usuário não encontrado');
  }

  await usuario.destroy();
  
  res.status(204).end();
});

module.exports = router;
