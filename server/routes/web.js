const express = require('express');

const entryRoute = require('./entry');
const githubAPIRoute = require('./githubAPI');

const router = express.Router();

router.use('/oauth', entryRoute);
router.use('/github', githubAPIRoute);

module.exports = router;
