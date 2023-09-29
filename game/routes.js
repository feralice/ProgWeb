const express = require('express');
const router = express.Router();
const path = require('path');

//rota para ir para a pag about
router.get('/about', (req, res) => {
  const gameInfo = {
    title: 'O Jogo de Xadrez',
    description: 'O xadrez é um jogo de tabuleiro, de caráter competitivo, disputado entre dois participantes. Cada um é representado por peças de cores opostas, geralmente são utilizadas pretas e brancas. O objetivo do jogo é conquistar o “rei” de seu adversário.Para jogar é necessário um tabuleiro composto por oito colunas e oito linhas, o que resulta em 64 casas possíveis para a mobilidade das peças. As peças são compostas de oito peões, duas torres, dois cavalos, dois bispos, uma rainha e um rei.',
  };
  res.render('about', gameInfo);
});

module.exports = router;
