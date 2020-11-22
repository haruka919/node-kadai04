const setUser = (req, res, next) => {
  if (req.cookies.name) {
    // ローカル変数にユーザー名を保存
    res.locals.loginUser = req.cookies.name
  } else {
    res.locals.loginUser = null
  }
  next()
}

module.exports = setUser
