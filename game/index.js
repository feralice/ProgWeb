import express from 'express';
import router from './src/routes/routes';
import { engine } from 'express-handlebars';

const morgan = require('morgan');
const app = express();
const PORT = 3000;

//cria a engine
app.engine('handlebars', engine());

//seta a engine
app.set('view engine', 'handlebars');
//onde as views estarão localizada
app.set('views', `${__dirname}/src/views`);

app.use(router);
app.use(morgan('combined'));

app.listen(PORT, () => {
  console.log(`Servidor rodando em "http://localhost:${PORT}" :D`);
});
