require('dotenv').config();

const express = require('express');
const app = express();

app.use(express.urlencoded({
  extended: false,
}));

const routerUsuarios = require('./routes/rotasUsuario');
app.use('/usuarios', routerUsuarios); 

const errorHandler = require('./middleware/error-handler');
app.use(errorHandler);

app.listen(3000, console.log('API rodando'))
