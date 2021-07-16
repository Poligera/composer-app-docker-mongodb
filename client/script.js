const header = document.querySelector("header");
const section = document.querySelector("section");
const article = document.querySelector("article");
const msgBtn = document.querySelector("#msg-button");
const getAllComposersBtn = document.querySelector("#all-composers");
const newComposerForm = document.querySelector("#new-composer-form");
const getByNameForm = document.querySelector("#get-by-name");
const getByCountryForm = document.querySelector("#get-by-country");

// event listeners
msgBtn.onclick = () => {
  getMessage();
  msgBtn.style.backgroundColor = "blue";
  msgBtn.style.textTransform = "uppercase";
};
getAllComposersBtn.onclick = () => {
  getAllComposers();
  getAllComposersBtn.style.backgroundColor = "gray";
  getAllComposersBtn.style.textTransform = "uppercase";
  getAllComposersBtn.disabled = true;
};
newComposerForm.addEventListener("submit", addNewComposer);
getByNameForm.addEventListener("submit", getComposerByName);
getByCountryForm.addEventListener("submit", getComposerByCountry);
// COMPOSERS' FLOW

// Message flow

function getMessage() {
  fetch("http://localhost:3000")
    .then((res) => res.text())
    .then((data) => (msgBtn.textContent = data))
    .catch(console.warn);
}

// COMPOSERS' FLOW
// all composers route:
function getAllComposers() {
  fetch("http://localhost:3000/all")
    .then((res) => res.json())
    .then((data) => {
      data.composers.forEach((composer) => {
        const par = document.createElement("p");
        par.textContent = `***\n${composer.fullName}\n${composer.country}\nborn: ${composer.birthYear}\ndied: ${composer.deathYear}`;
        section.append(par);
      });
    })
    .catch(console.warn);
}
// composer by name route:
function getComposerByName(e) {
  e.preventDefault();
  const name = e.target.name.value;
  fetch(`http://localhost:3000/${name}`)
    .then((res) => res.json())
    .then((data) => {
      const par = document.createElement("p");
      par.textContent = `${data.fullName}\n${data.country}\nborn: ${data.birthYear}\ndied: ${data.deathYear}`;
      e.target.closest("div").append(par);
    })
    .then(e.target.reset())
    .catch(console.warn);
}
// composer by country route:
function getComposerByCountry(e) {
  e.preventDefault();
  const divCountry = e.target.closest("div");

  const countryName = e.target.country.value;
  fetch(`http://localhost:3000/country/${countryName}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      data.composers.forEach((composer) => {
        const par = document.createElement("p");
        par.textContent = `***\n${composer.fullName}\n${composer.country}\nborn: ${composer.birthYear}\ndied: ${composer.deathYear}`;
        divCountry.append(par);
      });
    })
    .then(e.target.reset())
    .catch(console.warn);
}

function addNewComposer(e) {
  e.preventDefault();

  const composerData = {
    name: e.target.name.value,
    fullName: e.target.fullName.value,
    country: e.target.country.value,
    birthYear: e.target.birthYear.value,
    deathYear: e.target.deathYear.value,
  };

  const options = {
    method: "POST",
    body: JSON.stringify(composerData),
    headers: { "Content-Type": "application/json" },
  };

  fetch("http://localhost:3000/add", options)
    .then((res) => res.json())
    .then((data) => {
      const par = document.createElement("p");
      par.textContent = `Composer added:\n${data.fullName}`;
      article.append(par);
    })
    .then(() => e.target.reset())
    .catch(console.warn);
}
