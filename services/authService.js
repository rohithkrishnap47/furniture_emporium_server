const Auth = require("../models/authModal");

exports.findUserWithFilters = async (
  filters = {},
  projection = null,
  options = {}
) => {
  return await Auth.findOne(filters, projection, options);
};