const express = require('express');
const app = express();

const cookieParser = require('cookie-parser')

const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const config = require('./config.js');

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const createRouter = require('./routes/create');

// テンプレートエンジンの指定
app.set('view engine', 'ejs');

// リクエストヘッダに設定されたCookieを読み取るための設定
app.use(cookieParser())

// POSTデータを取得する時に必要
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// staticメソッドを利用し、指定ディレクトリ以下の静的ファイルを読み込む
app.use(express.static('public'));

// routeの設定
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/create', createRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});