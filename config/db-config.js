module.exports = {
  HOST: "localhost", // Use your test host
  USER: "root", // Use your host username
  PASSWORD: "", // Use your host password
  DB: "muvik", // DB I created to use
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
