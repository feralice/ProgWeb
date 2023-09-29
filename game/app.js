const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(morgan('dev'));

//configurações do handlebars como a engine de visualização
app.engine('.hbs', exphbs.engine({
  extname: '.hbs',
  defaultLayout: null 
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views')); // pega o handlebars da pasta views

//chama as rotas criadas
const routes = require('./routes');
app.use('/', routes);

//servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}, entre em http://localhost:${PORT}/about :)`);
});
