const faker = require("faker");
const { Article, User } = require("../models");

//faker es una libreria para generar datos truchos que no sean lorem ipsum
faker.locale = "es";

module.exports = async () => {
  const articles = [];
  const users = [];

  for (let i = 0; i < 10; i++) {
    authors.push({
      firstname: faker.name.title(1),
      lastname: faker.name.title(1),
    users.push({
      firstname: faker.name.title(1),
      lastname: faker.name.title(1),
      email: faker.name.title(1),
    });
  }
  const aux = await User.bulkCreate(users);

  for (let i = 0; i < 10; i++) {
    articles.push({
      title: faker.company.catchPhrase(5),
      content: faker.lorem.paragraphs(),
    });
  }
  await Article.bulkCreate(articles);
  console.log("[Database] Se corrió el seeder de Articles.");
};
