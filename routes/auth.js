const { verifyRegistration, auth } = require("../util");
const controller = require("../controllers/auth");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.post(
    "/api/auth/register",
    [
      auth.verifyToken,
      auth.isAdmin,
      verifyRegistration.checkDuplicateUsernameOrEmail,
      verifyRegistration.checkRolesExisted,
    ],
    controller.createUser
  );

  app.post("/api/auth/login", controller.login);

  app.post("/api/auth/logout", controller.logout);
};
