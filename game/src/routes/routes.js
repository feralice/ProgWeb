//arquivo de rotas
import express from 'express';
import main from '../controllers/main';
const router = express.Router();

//rota para o /
router.get('/', main.index);

//rota para o /about
router.get('/about', main.about);

//rota para a ui
router.get('/ui', main.ui);

//rota para o jogo
router.get('/game', main.game);

export default router;