module.exports = {
  // ユーザー登録画面表示
  show (req, res) {
    const data = {
      title: '会員登録',
      form: {
        name: '',
        email: '',
      }
    };
    res.render('./register.ejs', data);
  }
}