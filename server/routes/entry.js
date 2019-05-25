const express = require('express');

const controller = require('../controllers/entry');
const oauthMiddleware = require('../middlewares/githubOauth');
const authMiddleware = require('../middlewares/auth');

const { userAuthentication, } = authMiddleware;

const {
  githubOauth,
  githubUser,
} = oauthMiddleware;

const {
  postGithubLogin,
  getLogout,
} = controller;

const router = express.Router();

router.post('/github/login', githubOauth, githubUser, postGithubLogin);
router.get('/github/logout', userAuthentication, getLogout);

module.exports = router;
