const express = require('express');
const app = express();

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');

// テンプレートエンジンの指定
app.set('view engine', 'ejs');

// routeの設定
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});