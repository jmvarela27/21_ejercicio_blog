const faker = require("faker");
const { Article, Author } = require("../models");

//faker es una libreria para generar datos truchos que no sean lorem ipsum
faker.locale = "es";

module.exports = async () => {
  const articles = [];
  const authors = [];

  for (let i = 0; i < 10; i++) {
    authors.push({
      firstname: faker.name.title(1),
      lastname: faker.name.title(1),
      email: faker.lorem.sentence(1),
    });
  }

  for (let i = 1; i < 21; i++) {
    articles.push({
      title: faker.company.catchPhrase(5),
      content: faker.lorem.paragraphs(),
    });
  }

  await Article.bulkCreate(articles);
  await Author.bulkCreate(authors);
  console.log("[Database] Se corrió el seeder de Articles.");
};
