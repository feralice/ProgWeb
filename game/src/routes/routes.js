//arquivo de rotas
import express from 'express';
import main from '../controllers/main';
import areaController from '../controllers/area'
const router = express.Router();

//rota para o home
router.get('/', main.index);

//rota para o /about
router.get('/about', main.about);

//rota para a ui
router.get('/ui', main.ui);

//rota para o jogo
router.get('/game', main.game);

router.get('/areas', areaController.index);

export default router;