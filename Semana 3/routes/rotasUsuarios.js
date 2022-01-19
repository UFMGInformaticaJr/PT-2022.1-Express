const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');
const {InvalidParamsError, NotAuthorizedError} = require('../custom-errors');
const {loginMiddleware, jwtMiddleware} = require('../middleware/auth-middlewares');

router.post('/login', loginMiddleware);

router.get('/logout', jwtMiddleware, async (req, res, next) => {
  try {
    res.clearCookie('jwt');
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const body = req.body;

    const saltRounds = 10;
    const senhaHash = await bcrypt.hash(body.senha, saltRounds);

    const usuario = {
      nome: body.nome,
      email: body.email,
      senha: senhaHash,
    };

    await Usuario.create(usuario);

    res.status(201).end();
  } catch (error) {
    next(error);
  }
});

router.get('/', jwtMiddleware, async (req, res, next) => {
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

router.get('/:id', jwtMiddleware, async (req, res, next) => {
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

router.put('/:id', jwtMiddleware, async (req, res, next) => {
  try {
    const id = req.params.id;

    // Verifica se o usuário que chamou a requisição é diferente do usuário que está sendo editado
    if (id != req.user.id) {
      throw new NotAuthorizedError('Você não tem permissão para editar esse usuário');
    }

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

router.delete('/:id', jwtMiddleware, async (req, res, next) => {
  try {
    const id = req.params.id;

    // Verifica se o usuário que chamou a requisição é diferente do usuário que está sendo deletado
    if (id != req.user.id) {
      throw new NotAuthorizedError('Você não tem permissão para deletar esse usuário');
    }

    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      throw new InvalidParamsError('Usuário não encontrado');
    }

    await usuario.destroy();
    
    // Desloga o usuário após ele se deletar
    res.clearCookie('jwt');
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
