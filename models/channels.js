module.exports = (sequelize, Sequelize) => {
  const Channel = sequelize.define("channels", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
  });

  return Channel;
};
