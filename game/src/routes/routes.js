//arquivo de rotas
import express from 'express';
import main from '../controllers/main';
const router = express.Router();

//rota para o /
router.get('/', main.index);

//rota para o /about
router.get('/about', main.about);

export default router;