const express = require('express');
const router = express.Router();

const lojaDeJogos = {
  'The Witcher': {
    nome: 'The Witcher 3: Wild Hunt',
    ano: 2015,
    preco: 60.0,
    genero: 'RPG',
  },
  'FIFA 22': {
    nome: 'FIFA 22',
    ano: 2021,
    preco: 200.0,
    genero: 'Esporte',
  },
  'The Last of Us Part II': {
    nome: 'The Last of Us Part II',
    ano: 2020,
    preco: 120.0,
    genero: 'Ação-Aventura'
  },
  'The Elder Scrolls V: Skyrim': {
    nome: 'The Elder Scrolls V: Skyrim',
    ano: 2011,
    preco: 60.0,
    genero: 'RPG'
  },
  'Just Dance 2022': {
    nome: 'Just Dance 2022',
    ano: 2021,
    preco: 190.0,
    genero: 'Música'
  },
}

router.post('/', (req, res) => {
  const body = req.body;
  const jogo = {
    nome: body.nome,
    ano: parseInt(body.ano),
    preco: parseFloat(body.preco),
    genero: body.genero,
  }

  lojaDeJogos[jogo.nome] = jogo;

  res.status(201).end();
});

router.get('/', (req, res) => {
  res.status(200).json(lojaDeJogos);
});

router.get('/:id', (req, res) => {
  let jogo = {};
  const id = req.params.id; 
  if (lojaDeJogos[id]) {
    jogo = lojaDeJogos[id];
  }

  res.status(200).json(jogo);
});

router.put('/:id', (req, res) => {
  let jogo;
  const id = req.params.id; 
  if (lojaDeJogos[id]) {
    jogo = lojaDeJogos[id];
  } else {
    res.status(400).send('Jogo não encontrado');
  }

  const body = req.body;
  jogo.nome = body.nome || jogo.nome;
  jogo.ano = parseInt(body.ano) || jogo.ano;
  jogo.preco = parseFloat(body.preco) || jogo.preco;
  jogo.genero = body.genero || jogo.genero;
  
  res.status(200).json(jogo);
});

router.delete('/:id', (req, res) => {
  const id = req.params.id; 
  if (lojaDeJogos[id]) {
    delete lojaDeJogos[id];
  } else {
    res.status(400).send('Jogo não encontrado');
  }
  
  res.status(204).end();
});

module.exports = router;
