const express = require('express');
const router = express.Router();
const {InvalidParamsError, NotAuthorizedError} = require('../custom-errors');
const {jwtMiddleware} = require('../middleware/auth-middlewares');
const Jogo = require('../models/Jogo');
const Usuario = require('../models/Usuario');

router.post('/', jwtMiddleware, async (req, res, next) => {
  try {
    const body = req.body;
    const jogo = {
      nome: body.nome,
      preco: body.preco,
      genero: body.genero,
      UsuarioId: req.user.id
    }

    Jogo.create(jogo);

    res.status(201).end();
  } catch (error) {
    next(error)
  }
});

router.get('/', jwtMiddleware, async (req, res, next) => {
  try {
    const jogos = await Jogo.findAll({
      // attributes é usado para escolher quais campos serão selecionados no banco de dados
      attributes: ['id', 'nome', 'preco', 'genero', 'createdAt'],
      // Include é usado para incluir uma entidade de relacionamento
      include: {
        model: Usuario,
        attributes: ['id', 'nome'],
      }
    });
  
    res.status(200).json(jogos);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', jwtMiddleware, async (req, res, next) => {
  try {
    const jogo = await Jogo.findByPk(req.params.id, {
      attributes: ['id', 'nome', 'preco', 'genero', 'createdAt'],
      include: {
        model: Usuario,
        attributes: ['id', 'nome'],
      }
    });
  
    if (!jogo) {
      throw new InvalidParamsError('Jogo não encontrado');
    }
  
    res.status(200).json(jogo);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', jwtMiddleware, async (req, res, next) => {
  try {
    const jogo = await Jogo.findByPk(req.params.id);

    if (!jogo) {
      throw new InvalidParamsError('Jogo não encontrado');
    }

    // Verifica se o usuário que chamou a requisição é diferente do usuário que é "dono" do jogo
    if (jogo.UsuarioId != req.user.id) {
      throw new NotAuthorizedError('Você não tem permissão para editar esse jogo');
    }

    const body = req.body;
    // Não é permitido alterar o usuário
    jogo.nome = body.nome || jogo.nome;
    jogo.preco = body.preco || jogo.preco;
    jogo.genero = body.genero || jogo.genero;

    await jogo.save();
    
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', jwtMiddleware, async (req, res, next) => {
  try {
    const jogo = await Jogo.findByPk(req.params.id);

    if (!jogo) {
      throw new InvalidParamsError('Jogo não encontrado');
    }

    // Verifica se o usuário que chamou a requisição é diferente do usuário que é "dono" do jogo
    if (jogo.UsuarioId != req.user.id) {
      throw new NotAuthorizedError('Você não tem permissão para deletar esse jogo');
    }

    await jogo.destroy();
    
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
