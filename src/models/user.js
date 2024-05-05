// src/models/User.js
const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/database");

const User = sequelize.define(
  "User",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Agregar timestamps
    timestamps: true,
  }
);
// Antes de crear un usuario, hasheamos la contraseña
User.beforeCreate(async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;
});

// Sincronizar el modelo con la base de datos (crear la tabla si no existe)
User.sync();

module.exports = User;
