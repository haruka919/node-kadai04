const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const createRouter = require('./routes/create');

// テンプレートエンジンの指定
app.set('view engine', 'ejs');

// POSTデータを取得する時に必要
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routeの設定
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/create', createRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});