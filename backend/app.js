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


const setUser = require('./routes/setUser');

// 認証
const auth = (req, res, next) => {
  // リクエストヘッダーからトークンの取得
  const key = 'token';
  let token = '';
  const cookie_data = req.headers.cookie != undefined ? req.headers.cookie : '';
  const data = cookie_data.split(';');
  for (let i in data) {
    if (data[i].trim().startsWith(key + '=')) {
      const result = data[i].trim().substring(key.length + 1);
      token = unescape(result)
    }
  }

  if (!token) {
    // トークンがない場合はログインページにリダイレクト
    res.redirect('/login')
  }

  // トークンの検証
  jwt.verify(token, config.jwt.secret, (err, decoded) => {
    if (err) {
      // 認証NGの場合はログインページにリダイレクト
      res.redirect('/login')
    } else {
      // 認証OKの場合
      req.decoded = decoded;
      next();
    }
  });
}

// routeの設定
app.use('/login', setUser, loginRouter);
app.use('/logout', setUser, loginRouter);
app.use('/register', setUser, registerRouter);
app.use('/create', setUser, auth,createRouter);
app.use('/', setUser, auth, indexRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});