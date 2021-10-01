module.exports = (sequelize, Model, DataTypes) => {
  class Comment extends Model {}

  Comment.init(
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      content: {
        type: DataTypes.TEXT,
      },
      authorName: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "comment",
    },
  );

  return Comment;
};
