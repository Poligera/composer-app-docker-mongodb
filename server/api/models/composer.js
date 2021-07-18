const { init } = require("../dbConfig");
//Constructor function that creates unique identifiers for all the documents:
const { ObjectId } = require("mongodb");

class Composer {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.fullName = data.fullName;
    this.country = data.country;
    this.birthYear = data.birthYear;
    this.deathYear = data.deathYear;
  }

  static get all() {
    return new Promise(async (resolve, reject) => {
      try {
        const db = await init();
        const composerData = await db.collection("composers").find().toArray();
        const composers = composerData.map((c) => new Composer({ ...c }));
        resolve(composers);
      } catch (err) {
        reject("Error retrieving composers");
      }
    });
  }

  static findByName(name) {
    return new Promise(async (resolve, reject) => {
      try {
        const db = await init();
        let composerData = await db
          .collection("composers")
          .find({ name: name })
          .toArray();
        let composer = new Composer({
          ...composerData[0],
        });
        resolve(composer);
      } catch (err) {
        reject("Composer not found!");
      }
    });
  }

  static findByCountry(country) {
    return new Promise(async (resolve, reject) => {
      try {
        const db = await init();
        let composerData = await db
          .collection("composers")
          .find({ country: country })
          .toArray();
        let composers = composerData.map((c) => new Composer({ ...c }));
        resolve(composers);
      } catch (err) {
        reject("Composers from this country not found!");
      }
    });
  }

  static create(name, fullName, country, birthYear, deathYear) {
    return new Promise(async (resolve, reject) => {
      try {
        const db = await init();
        let composerData = await db.collection("composers").insertOne({
          name,
          fullName,
          country,
          birthYear,
          deathYear,
        });
        let newComposer = new Composer(composerData.ops[0]);
        resolve(newComposer);
      } catch (err) {
        reject("Error creating composer!");
      }
    });
  }

  update(fullName, country, birthYear, deathYear) {
    return new Promise(async (resolve, reject) => {
      try {
        const db = await init();
        let updatedComposerData = await db
          .collection("composers")
          .findOneAndUpdate(
            { name: this.name },
            {
              $set: {
                // _id: ObjectId(this.id),
                fullName: fullName,
                country: country,
                birthYear: birthYear,
                deathYear: deathYear,
              },
            },
            { returnNewDocument: true }
          );
        let updatedComposer = new Composer(updatedComposerData.value);
        resolve(updatedComposer);
      } catch (err) {
        reject("Error updating composer");
      }
    });
  }

  destroy() {
    return new Promise(async (resolve, reject) => {
      try {
        const db = await init();
        await db.collection("composers").deleteOne({ name: this.name });
        resolve("Composer was deleted");
      } catch (err) {
        reject("Composer could not be deleted");
      }
    });
  }
}

module.exports = Composer;
