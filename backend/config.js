require('dotenv').config()
const env = process.env

module.exports = {
  jwt: {
    secret: env.JWT_SECRET,
    options: {
      expiresIn: env.JWT_EXPIRES_IN
    }
  }
};