const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(morgan('combined'));

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT} :D`);
});
