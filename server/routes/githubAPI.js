const express = require('express');
const controller = require('../controllers/githubAPI');
const authMiddleware = require('../middlewares/auth');

const { userAuthentication, } = authMiddleware;

const {
  getAuthenticatedUser,
  getAuthenticatedUserRepos,
  postCreateRepo,
  deleteRepo,
} = controller;

const router = express.Router();

router.use(userAuthentication);

router.get('/user', getAuthenticatedUser);
router.get('/repos', getAuthenticatedUserRepos);
router.post('/repo', postCreateRepo);
router.delete('/repo', deleteRepo);

module.exports = router;
