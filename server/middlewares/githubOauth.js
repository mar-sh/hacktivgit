const axios = require('axios');

const githubOauth = (req, res, next) => {
  const { code } = req.body;
  const url = `https://github.com/login/oauth/access_token`
  const queries = `?code=${code}&client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}`
  
  axios({
    method: 'POST',
    url: url + queries,
  })
    .then(({ data}) => {
      req.githubToken = data.split('=')[1].split('&')[0];
      return next();
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err);
    })
};

const githubUser = (req, res, next) => {
  const token = req.githubToken;
  const url = `https://api.github.com`

  axios({
    method: 'GET',
    url: `${url}/user`,
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/vnd.github.v3+json',
    },
  })
    .then(({ data }) => {
      req.githubUser = {
        id: data.id,
        login: data.login,
        avatar_url: data.avatar_url,
        token,
      };
      return next();
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err);
    });
};

module.exports = {
  githubOauth,
  githubUser,
}
