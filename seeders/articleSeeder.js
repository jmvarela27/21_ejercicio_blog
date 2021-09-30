const faker = require("faker");
const { Article, User } = require("../models");

faker.locale = "es";

module.exports = async () => {
  const articles = [];
  const users = [];

  for (let i = 0; i < 10; i++) {
    users.push({
      firstname: faker.lorem.sentence(1),
      lastname: faker.lorem.sentence(1),
      email: faker.lorem.sentence(1),
    });
  }
  const aux = await User.bulkCreate(users);

  for (let i = 0; i < 10; i++) {
    articles.push({
      title: faker.lorem.sentence(5),
      content: faker.lorem.paragraphs(),
    });
  }
  await Article.bulkCreate(articles);
  console.log("[Database] Se corrió el seeder de Articles.");
};
