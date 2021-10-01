const faker = require("faker");
const { Article, User, Comment } = require("../models");

//faker es una libreria para generar datos truchos que no sean lorem ipsum
faker.locale = "es";

module.exports = async () => {
  const articles = [];
  const users = [];
  const comments = [];

  for (let i = 0; i < 5; i++) {
    users.push({
      firstname: faker.lorem.sentence(1),
      lastname: faker.lorem.sentence(1),
      email: faker.lorem.sentence(1),
    });
  }
  const aux = await User.bulkCreate(users);

  for (let i = 0; i < 5; i++) {
    articles.push({
      title: faker.company.catchPhrase(5),
      content: faker.lorem.paragraphs(),
      userId: (i % 5) + 1,
      image: `image${i + 1}.jpg`,
    });
  }

  for (let i = 0; i < 10; i++) {
    comments.push({
      content: faker.lorem.paragraphs(),
      authorName: faker.lorem.sentence(2),
      articleId: (i % 5) + 1,
    });
  }

  await Article.bulkCreate(articles);
  await Comment.bulkCreate(comments);
  console.log("[Database] Se corrió el seeder de Articles.");
};
