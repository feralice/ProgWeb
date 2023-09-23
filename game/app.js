const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const routes = require('./routes');

const app = express();

app.use(morgan('dev'));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.set('views', path.join(__dirname, 'views'));

app.use('/', routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
