
const jwt = require("jsonwebtoken");
exports.authenticateJWT = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (authHeader) {
      const token = authHeader

      jwt.verify(token, "randomString", (err, user) => {
          if (err) {
              return res.sendStatus(403);
          }

          req.user = user;
          next();
      });
  } else {
      res.sendStatus(401);
  }
};
