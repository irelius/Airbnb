const jwt = require('jsonwebtokens');
const { jwtConfig } = require("../config");
const { User } = require('../db/models');

const {secret, expiresIn } = jwtConfig;
