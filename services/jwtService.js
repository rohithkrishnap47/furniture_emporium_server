const jwt = require("jsonwebtoken")


exports.verifyUserToken = (token, ignoreExpiration = false) => {
  return new Promise((resolve, reject) => {
    try {
      let decoded = jwt.verify(token, process.env.USER_TOKEN_JWT_SECRET, {
        ignoreExpiration: ignoreExpiration,
      });
      return resolve(decoded);
    } catch (error) {
      return reject(error);
    }
  });
};


exports.getAuthTokenFromHeader = async (req) => {
  try {
    const {
      headers: { authorization },
    } = req;
    if (authorization && authorization.split(" ")[0] === "Bearer") {
      return authorization.split(" ")[1];
    } else {
      throw new Error(401, "Unauthorized", []);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};