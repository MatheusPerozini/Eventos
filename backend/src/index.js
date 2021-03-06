const routes = require('./routes');
const express = require('express');
const {errors} = require('celebrate');
const cors = require('cors');
const app = express();

app.use(cors());
//app.use(cors({origin : 'https://nomedosite.com'}))
app.use(express.json());
app.use(routes);
app.use(errors());

app.listen(3333);