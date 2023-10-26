//arquivo de rotas
import express from 'express';
import main from '../controllers/main';
import areaController from '../controllers/area'
import cursoController from '../controllers/curso'
const router = express.Router();

//main
router.get('/', main.index);
router.get('/about', main.about);
router.get('/ui', main.ui);
router.get('/game', main.game);

//area
router.get('/areas', areaController.index);

//curso
router.get('/curso', cursoController.index);
router.get('/curso/create', cursoController.create);
router.post('/curso/create', cursoController.create);
router.get('/curso/:id', cursoController.read);
router.get('/curso/update/:id', cursoController.update);
router.post('/curso/update/:id', cursoController.update);
router.delete('/curso/:id', cursoController.remove);

export default router;