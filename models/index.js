const config = require("../config/db-config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: false,

  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/users.js")(sequelize, Sequelize);
db.role = require("../models/roles.js")(sequelize, Sequelize);
db.channel = require("../models/channels.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId",
});

db.ROLES = ["user", "admin", "sub-admin"];

db.channel.belongsToMany(db.user, {
  through: "user_channels",
  foreignKey: "channelId",
  otherKey: "userId",
});
db.channel.belongsToMany(db.role, {
  through: "user_channels",
  foreignKey: "userId",
  otherKey: "channelId",
});

db.CHANNELS = ["channel_1", "channel_2", "channel_3"];

module.exports = db;
