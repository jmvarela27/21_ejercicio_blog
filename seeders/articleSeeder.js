const faker = require("faker");
const { Article, User, Comment } = require("../models");

//faker es una libreria para generar datos truchos que no sean lorem ipsum
faker.locale = "es";

module.exports = async () => {
  const articles = [];
  const users = [];
  const comments = [];

  users.push({
    firstname: "Felipe",
    lastname: "Vazquez",
    email: "felipe@gmail.com",
    password: "hola1234",
  });

  for (let i = 0; i < 5; i++) {
    articles.push({
      title: faker.company.catchPhrase(5),
      content: faker.lorem.paragraphs(),
      userId: 1,
      image: `image${i + 1}.jpg`,
    });
  }

  for (let i = 0; i < 10; i++) {
    comments.push({
      content: faker.lorem.paragraphs(),
      authorName: faker.lorem.sentence(2),
      articleId: 1,
    });
  }

  await User.bulkCreate(users);
  await Article.bulkCreate(articles);
  await Comment.bulkCreate(comments);
  console.log("[Database] Se corrió el seeder de Articles.");
};
