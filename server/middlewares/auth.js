const User = require('../models/User');
const { verifyAccessToken } = require('../helpers/access');

const userAuthentication = (req, res, next) => {
  if(req.headers.hasOwnProperty('authorization')) {
    try{
      const decode = verifyAccessToken(req.headers.authorization, process.env.JWT_SECRET);
      
      return User.findOne({ _id: decode.id })
        .then((user) => {
          if(user) {
            req.authenticated = {
              id: user._id,
              userId: user.github_id,
              github_login: user.github_login,
              github_token: user.github_token,
            };

            return next();
          } else {
            throw new Error('user not found')
          }
        })
        .catch((err) => {
          console.log(err)
          res.status(500).json(err);
        })
    }

    catch(error) {
      console.log(err)
      res.status(500).json(error);
    }
  } else {
    res.status(400).json({ message: 'unauthorized' });
  }
};

module.exports = { userAuthentication };
