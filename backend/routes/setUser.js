const setUser = (req, res, next) => {
  if (req.decoded) {
    // ローカル変数にユーザー名を保存
    res.locals.loginUser = req.decoded.name
  } else {
    res.locals.loginUser = null
  }
  next()
}

module.exports = setUser
