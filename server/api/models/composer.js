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
        const composers = composerData.map((c) => new Composer(c));
        resolve(composers);
      } catch (err) {
        reject("Composers from this country not found!");
      }
    });
  }
  // static create(name, years, country) - later
  // update() - later
  // destroy() - later
}

module.exports = Composer;
