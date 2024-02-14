const access = (...permittedRoles) => {
  return (req, res, next) => {
    if (permittedRoles.includes(req.role)) {
      next();
    } else {
      res.send({ msg: "You have no access to this route" });
    }
  };
};

module.exports = {
  access,
};
