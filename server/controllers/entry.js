const User = require("../models/User");

const { createAccessToken } = require("../helpers/access");

class EntryController {
  static postGithubLogin(req, res) {
    const githubUser = req.githubUser;

    User
    .findOne({ github_id: githubUser.id })
      .then(user => {
        if (user) {
          user.github_token = githubUser.token;
          return user
          .save()
            .then(user => {
              const accessToken = createAccessToken({
                id: user._id,
                username: user.github_login,
                userId: user.github_id
              });

              res.status(200).json({ 
                status: 'success',
                accessToken,
                currentUser: {
                  username: user.github_login,
                  avatar: user.github_avatar
                },
              });
            });
        } else {
          const newUser = new User({
            github_id: githubUser.id,
            github_login: githubUser.login,
            github_avatar: githubUser.avatar_url,
            github_token: githubUser.token
          });
          return newUser
          .save()
            .then(user => {
              const accessToken = createAccessToken({
                id: user._id,
                username: user.github_login,
                userId: user.github_id
              });

              res.status(201).json({
                status: 'success',
                accessToken,
                currentUser: {
                  username: user.github_login,
                  avatar: user.github_avatar
                },
              });
            });
        }
      })
      .catch(err => {
        console.log(err)
        res.status(500).json(err);
      });
  };

  static getLogout(req, res) {
    const { id } = req.authenticated;

    User.findOneAndUpdate({ _id: id }, { github_token: null }).exec();
    res.status(200).json({ status: 'success',});
  }
}

module.exports = EntryController;
