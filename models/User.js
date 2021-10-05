const bcrypt = require("bcryptjs");
odule.exports = (sequelize, Model, DataTypes) => {
  class User extends Model {
    validatePassword(password){
      return match = await bcrypt.compare(password, this.password)
    }
    static encryptPassword(password){
      return await bcrypt.hash(password,10);
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      firstname: {
        type: DataTypes.STRING,
      },
      lastname: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      
    },
    {
      sequelize,
      modelName: "user",
    },
  );

  return User;
};
