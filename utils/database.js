const Sequelize = require("sequelize");

const sequelize = new Sequelize("projectbook", "root", "", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
