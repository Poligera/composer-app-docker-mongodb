const db = connect("mongodb://localhost:27017/composers");

db.composers.drop();

db.composers.insertMany([
  {
    name: "Mozart",
    fullName: "Wolfgang Amadeus Mozart",
    country: "Austria",
    birthYear: 1756,
    deathYear: 1791,
  },
  {
    name: "Schubert",
    fullName: "Franz Schubert",
    country: "Austria",
    birthYear: 1797,
    deathYear: 1828,
  },
  {
    name: "Bach",
    fullName: "Johann Sebastian Bach",
    country: "Germany",
    birthYear: 1685,
    deathYear: 1750,
  },
  {
    name: "Haydn",
    fullName: "Franz Joseph Haydn",
    country: "Austria",
    birthYear: 1732,
    deathYear: 1809,
  },
  {
    name: "Mozart",
    fullName: "Wolfgang Amadeus Mozart",
    country: "Austria",
    birthYear: 1756,
    deathYear: 1791,
  },
  {
    name: "Scarlatti",
    fullName: "Domenico Scarlatti",
    country: "Italy",
    birthYear: 1685,
    deathYear: 1757,
  },
  {
    name: "Chopin",
    fullName: "Frédéric Chopin",
    country: "Poland",
    birthYear: 1810,
    deathYear: 1849,
  },
  {
    name: "Wagner",
    fullName: "Richard Wagner",
    country: "Austria",
    birthYear: 1813,
    deathYear: 1883,
  },
]);
