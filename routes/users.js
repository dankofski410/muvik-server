const { auth } = require("../util");
const controller = require("../controllers/users");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.get("/api/all", controller.allAccess);

  app.get("/api/user-reports", [auth.verifyToken], controller.userReports);

  app.get("/api/channels", [auth.verifyToken], controller.userChannels);

  app.get(
    "/api/sub-admin",
    [auth.verifyToken, auth.isSubAdmin],
    controller.subAdminDash
  );

  app.get("/api/admin", [auth.verifyToken, auth.isAdmin], controller.adminDash);

  app.put(
    "/api/permissions",
    [auth.verifyToken, auth.isAdmin],
    controller.grantPermissions
  );

  app.get(
    "/api/distribute-channels",
    [auth.verifyToken, auth.isAdmin],
    controller.adminDistChannels
  );

  app.post(
    "/api/create-channel",
    [auth.verifyToken, auth.isAdmin],
    controller.createChannels
  );
};
