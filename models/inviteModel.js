module.exports = (sequelize, DataTypes) => {
    const Invite = sequelize.define("invite", {
      workspace_id: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        allowNull: false,
      },
      user_email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        foreignKey: true,
         validate: {
        isEmail: true,
        notEmpty: true,
        len: [1, 255],
        },
      },
    });
  
    return Invite;
  };
  