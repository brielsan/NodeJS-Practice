const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Movieorserie", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    calification: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
