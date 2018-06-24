const { Router } = require('express')
const ctrls = require('../controllers')
const validator = require('../services/validation.service')
const schemas = require('../validations')
const auth = require('../services/auth.service')

module.exports = Router()
  .post('/anime', validator.validateBody(schemas.anime.add), ctrls.anime.addAnime)
  .post('/signup', validator.validateBody(schemas.user.signUp), ctrls.user.signUp)