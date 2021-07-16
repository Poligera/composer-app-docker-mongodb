// const { resolve } = require("path/posix");
const db = require("../dbConfig");

class Composer {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.fullName = data.full_name;
    this.country = data.country;
    this.birthYear = data.birth_year;
    this.deathYear = data.death_year;
  }

  static get all() {
    return new Promise(async (resolve, reject) => {
      try {
        const composerData = await db.query(`SELECT * FROM composers;`);
        const composers = composerData.rows.map((c) => new Composer(c));
        resolve(composers);
      } catch (err) {
        reject("Error retrieving composers");
      }
    });
  }

  static findByName(name) {
    return new Promise(async (resolve, reject) => {
      try {
        let composerData = await db.query(
          `SELECT * FROM composers WHERE name = $1;`,
          [name]
        );
        let composer = new Composer(composerData.rows[0]);
        resolve(composer);
      } catch (err) {
        reject("Composer not found!");
      }
    });
  }

  static findByCountry(country) {
    return new Promise(async (resolve, reject) => {
      try {
        let composerData = await db.query(
          `SELECT * FROM composers WHERE country = $1;`,
          [country]
        );
        const composers = composerData.rows.map((c) => new Composer(c));
        resolve(composers);
      } catch (err) {
        reject("Composers from this country not found!");
      }
    });
  }

  static create(name, fullName, country, birthYear, deathYear) {
    return new Promise(async (resolve, reject) => {
      try {
        let composerData = await db.query(
          `INSERT INTO composers (name, full_name, country, birth_year, death_year) VALUES ($1, $2, $3, $4, $5) RETURNING full_name;`,
          [name, fullName, country, birthYear, deathYear]
        );
        let newComposer = new Composer(composerData.rows[0]);
        resolve(newComposer);
      } catch (err) {
        reject("Error creating composer!");
      }
    });
  }
  // update() - later
  destroy() {
    return new Promise(async (resolve, reject) => {
      try {
        await db.query(`DELETE FROM composers WHERE name = $1;`, [this.name]);
        resolve("Composer was deleted");
      } catch (err) {
        reject("Composer could not be deleted");
      }
    });
  }
}

module.exports = Composer;
