const db = require("../models");
const config = require("../config/auth-config");
const User = db.user;
const Role = db.role;
const Channel = db.channel;

const Op = db.Sequelize.Op;

exports.allAccess = (req, res) => {
  res.status(200).send("Home");
};

exports.userReports = (req, res) => {
  res.status(200).send("User Reports");
};

exports.userChannels = (req, res) => {
  res.status(200).send("User Channels");
};

exports.createChannels = (req, res) => {
  res.status(200).send("Create Channel");
};

exports.adminDash = (req, res) => {
  res.status(200).send("Admin Dashboard");
};

exports.subAdminDash = (req, res) => {
  res.status(200).send("Sub-Admin Dashboard");
};

exports.adminDistChannels = async (req, res) => {
  let user_data = [];
  //   res.status(200).send("Sub-Admin Dashboard");
  try {
    const users = await User.findAll({});
    const channels = await Channel.findAll({});

    if (!users) {
      return res.status(404).send({ message: "Users Not found." });
    }

    for (let i = 0; i < users.length; i++) {
      user_data.push({ id: users[i].id, name: users[i].username });
    }

    return res.status(200).send({
      data: { user_data, channels },
      message: "Distribute Channels",
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.grantPermissions = async (req, res) => {
  // Add roles
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    let authorities = [];
    const roles = await user.getRoles();
    for (let i = 0; i < roles.length; i++) {
      authorities.push("ROLE_" + roles[i].name.toUpperCase());
    }

    let newRoles = req.new_roles;

    for (let i = 0; i < newRoles.length; i++) {
      authorities.push("ROLE_" + newRoles[i].name.toUpperCase());
    }

    return res.status(200).send({
      roles: authorities,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
