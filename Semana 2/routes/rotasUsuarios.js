const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');
const {InvalidParamsError} = require('../custom-errors');

router.post('/', async (req, res, next) => {
  try {
    const body = req.body;
    const usuario = {
      nome: body.nome,
      email: body.email,
      senha: body.senha,
    }

    await Usuario.create(usuario);

    res.status(201).end();
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const usuarios = await Usuario.findAll({
      // attributes é usado para escolher quais campos serão selecionados no banco de dados
      attributes: ['id', 'nome', 'email', 'createdAt'],
    });
  
    res.status(200).json(usuarios);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id, {
      attributes: ['id', 'nome', 'email', 'createdAt'],
    });

    if (!usuario) {
      throw new InvalidParamsError('Usuario não encontrado');
    }
  
    res.status(200).json(usuario);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      throw new InvalidParamsError('Usuário não encontrado');
    }

    const body = req.body;
    // Não permitiremos a alteração de senha
    usuario.nome = body.nome || usuario.nome;
    usuario.email = body.email || usuario.email;
    
    await usuario.save();

    res.status(204).json();
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      throw new InvalidParamsError('Usuário não encontrado');
    }

    await usuario.destroy();
    
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
