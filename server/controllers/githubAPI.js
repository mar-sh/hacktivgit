const axios = require('axios');
const dataHelper = require('../helpers/data');

const { filterRelevant } = dataHelper;

const githubAPI = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github.v3+json',
  },
});

class GithubAPIController {

  static getAuthenticatedUser(req, res) {
    api({
      method: 'GET',
      url: '/user',
      headers: {
        Authorization: `token ${req.authenticated.github_token}`,
      },
    })
    .then(({ data }) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    })
  };

  static getAuthenticatedUserRepos(req, res) {
    githubAPI({
      method: 'GET',
      url: '/user/repos',
      headers: {
        Authorization: `token ${req.authenticated.github_token}`,
      },
    })
      .then(({ data }) => {
        data = filterRelevant(data);
        res.status(200).json(data);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  };

  static postCreateRepo(req, res) {
    const {
      name,
      description,
      status,
    } = req.body;

    githubAPI({
      method: 'POST',
      url: 'user/repos',
      data: {
        name,
        description,
        private: status,
      },
      headers: {
        Authorization: `token ${req.authenticated.github_token}`,
      },
    })
      .then(({ data }) => {
        data = filterRelevant([data]);
        res.status(201).json(data[0]);
      })
      .catch((err) => {
        console.log(err)
        res.status(500).json(err);
      });
  };

  static deleteRepo(req, res) {
    const { repo } = req.body;
    const owner = req.authenticated.github_login;

    githubAPI({
      method: 'DELETE',
      url: `repos/${owner}/${repo}`,
      headers: {
        Authorization: `token ${req.authenticated.github_token}`,
      }, 
    })
      .then(({ data }) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        console.log(err)
        res.status(500).json(err);
      });
  };

};

module.exports = GithubAPIController;
