const express = require('express');
const {InvalidParamsError} = require('../custom-errors');
const Jogo = require('../models/Jogo');
const Usuario = require('../models/Usuario');
const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const body = req.body;
    const jogo = {
      nome: body.nome,
      ano: body.ano,
      preco: body.preco,
      genero: body.genero,
      UsuarioId: body.UsuarioId
    }

    Jogo.create(jogo);

    res.status(201).end();
  } catch (error) {
    next(error)
  }
});

router.get('/', async (req, res, next) => {
  try {
    const jogos = await Jogo.findAll({
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

router.get('/:id', async (req, res, next) => {
  try {
    const jogo = await Jogo.findByPk(req.params.id, {
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

router.put('/:id', async (req, res, next) => {
  try {
    const jogo = await Jogo.findByPk(req.params.id);

    if (!jogo) {
      throw new InvalidParamsError('Jogo não encontrado');
    }

    const body = req.body;
    // Não é permitido alterar o usuário
    jogo.nome = body.nome || jogo.nome;
    jogo.ano = body.ano || jogo.ano;
    jogo.preco = body.preco || jogo.preco;
    jogo.genero = body.genero || jogo.genero;

    await jogo.save();
    
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const jogo = await Jogo.findByPk(req.params.id);

    if (!jogo) {
      throw new InvalidParamsError('Jogo não encontrado');
    }

    await jogo.destroy();
    
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
