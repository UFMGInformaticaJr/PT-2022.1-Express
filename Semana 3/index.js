require('dotenv').config();

const express = require('express');
const app = express();

const cors = require('cors');
// Configuração do CORS necessária para que o front-end possa consumir a API
app.use(cors({
  origin: process.env.APP_URL,
  credentials: true,
}));

const cookieParser = require('cookie-parser');
app.use(cookieParser());

require('./auth');

app.use(express.urlencoded({
  extended: false,
}));

const routerUsuarios = require('./routes/rotasUsuarios');
app.use('/usuarios', routerUsuarios); 

const routerJogos = require('./routes/rotasJogos');
app.use('/jogos', routerJogos); 

const errorHandler = require('./middleware/error-handler');
app.use(errorHandler);

app.listen(3001, console.log('API rodando'))
