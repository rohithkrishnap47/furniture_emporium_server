const services = require("../services/index")
const mongoose = require("mongoose");



async function verifyUser(req, res, next) {
  try {
    let token = await services.jwtService.getAuthTokenFromHeader(req);
    if (token) {
      let decoded = await services.jwtService.verifyUserToken(token, true);
      if (decoded && decoded.id) {
        let id = mongoose.Types.ObjectId(decoded.id);
        let user = await services.authService.findUserWithFilters(
          {
            token: token,
            _id: id,
          },
          "_id",
          { lean: true }
        );
        if (user) {
          req.user = user;
          return next();
        }
      }
    }
    throw new Error(401, "Unauthorized", []);
  } catch (error) {
    console.log(error);
    next(new Error (401, "Unauthorized", []));
  }
}

module.exports = { verifyUser };