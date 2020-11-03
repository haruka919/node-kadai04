const { check } = require('express-validator/check');

module.exports = [
  check('name').not().isEmpty().withMessage('Nameは必須項目です。'),
  check('email').isEmail().withMessage('Email addressはメールアドレスを入力して下さい。'),
  check('password').isLength({ min: 7 }).withMessage('Passwordは7文字以上で入力して下さい。'),
  check('password').custom( (value, { req }) => {
    if (req.body.password !== req.body.password_confirm) {
      throw new Error('Password（再入力）と一致しません。');
    }
    return true;
  })
];