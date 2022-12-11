const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const bcrypt = require("bcryptjs");

const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./models");
const Role = db.role;
const User = db.user;

// This will create all the tables I used
db.sequelize.sync();

app.use(
  cookieSession({
    name: "muvik-session",
    secret: "COOKIE_SECRET",
    httpOnly: true,
  })
);

// routes
require("./routes/auth")(app);
require("./routes/users")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
