const jwt = require("jsonwebtoken");
const config = require("../config/auth-config");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
  //let token = req.session.token;
  let headers = req.headers;
  let token = headers["x-access-token"];

  // let token = req.session.token;
  // let headers = req.headers;

  // if (!token) {
  //   let token = headers["x-access-token"];
  //   if (!token) {
  //     return res.status(403).send({
  //       message: "No token provided!",
  //     });
  //   }
  // }

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    const roles = await user.getRoles();

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "admin") {
        return next();
      }
    }

    return res.status(403).send({
      status: 0,
      message: "Require Admin Role!",
    });
  } catch (error) {
    return res.status(500).send({
      message: "Unable to validate User role!",
    });
  }
};

isSubAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    const roles = await user.getRoles();

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "sub-admin") {
        return next();
      }
    }

    return res.status(403).send({
      message: "Require Sub-Admin Role!",
    });
  } catch (error) {
    return res.status(500).send({
      message: "Unable to validate SUb-Admin role!",
    });
  }
};

isSubAdminOrAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    const roles = await user.getRoles();

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "sub-admin") {
        return next();
      }

      if (roles[i].name === "admin") {
        return next();
      }
    }

    return res.status(403).send({
      message: "Require Sub-Admin or Admin Role!",
    });
  } catch (error) {
    return res.status(500).send({
      message: "Unable to validate Sub-Admin or Admin role!",
    });
  }
};

const auth = {
  verifyToken,
  isAdmin,
  isSubAdmin,
  isSubAdminOrAdmin,
};
module.exports = auth;
