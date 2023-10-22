import express from 'express';
import router from './src/routes/routes';
import { engine } from 'express-handlebars';
import sass from "node-sass-middleware"

const morgan = require('morgan');
const app = express();
const PORT = 3000;

app.use(sass({
  src: `${__dirname}/public/scss`,
  dest: `${__dirname}/public/css`,
  outputStyle: "compressed",
  prefix: "/css",
}));

//pra enviar arquivos estaticos tipo fotos
app.use("/img",express.static(`${__dirname}/public/img`));

//cria a engine
app.engine('handlebars', engine({
  //helpers: require(`${__dirname}/src/views/helpers/helpers`)
  layoutsDir: `${__dirname}/src/views/layouts`,
  defaultLayout: 'main',
}));

//seta a engine
app.set('view engine', 'handlebars');
//onde as views estarão localizada
app.set('views', `${__dirname}/src/views`);

app.use(router);
app.use(morgan('combined'));

app.listen(PORT, () => {
  console.log(`Servidor rodando em "http://localhost:${PORT}" : D`);
});
