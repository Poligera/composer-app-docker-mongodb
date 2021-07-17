const header = document.querySelector("header");
const composerList = document.querySelector("#composer-list");
const article = document.querySelector("article");
const msgBtn = document.querySelector("#msg-button");
const getAllComposersBtn = document.querySelector("#all-composers");
const newComposerForm = document.querySelector("#new-composer-form");
const getByNameForm = document.querySelector("#get-by-name");
const getByCountryForm = document.querySelector("#get-by-country");
const nameSearchResults = document.querySelectorAll(".search-results")[0];
const countrySearchResults = document.querySelectorAll(".search-results")[1];

// event listeners
msgBtn.onclick = () => {
  getMessage();
  msgBtn.style.backgroundColor = "blue";
};
getAllComposersBtn.onclick = () => {
  getAllComposers();
};

newComposerForm.addEventListener("submit", addNewComposer);
getByNameForm.addEventListener("submit", getComposerByName);
getByCountryForm.addEventListener("submit", getComposerByCountry);

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
  composerList.textContent = "";
  fetch("http://localhost:3000/all")
    .then((res) => res.json())
    .then((data) => {
      data.composers.forEach((composer) => {
        const par = document.createElement("p");
        const btnDiv = document.createElement("div");
        const deleteBtn = document.createElement("button");
        const updateBtn = document.createElement("button");
        par.textContent = `***\n${composer.fullName}\n${composer.country}\nborn: ${composer.birthYear}\ndied: ${composer.deathYear}`;
        updateBtn.textContent = "UPDATE";
        deleteBtn.textContent = "DELETE";
        btnDiv.append(updateBtn);
        btnDiv.append(deleteBtn);
        par.append(btnDiv);
        composerList.append(par);
        deleteBtn.onclick = () => deleteComposer(composer.name);
        updateBtn.onclick = () => {
          const updateForm = createUpdateComposerForm(composer);
          par.append(updateForm);
          updateBtn.disabled = true;
          updateForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const updatedData = {
              name: composer.name,
              fullName: e.target.fullNameUpdate.value,
              country: e.target.countryUpdate.value,
              birthYear: parseInt(e.target.birthYearUpdate.value),
              deathYear: parseInt(e.target.deathYearUpdate.value),
            };
            updateComposer(updatedData, updateForm);
          });
        };
      });
    })
    .catch(console.warn);
}

// Update route:
function updateComposer(data, el) {
  const options = {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  };

  fetch(`http://localhost:3000/${data.name}`, options)
    .then((r) => r.json())
    .then((data) => {
      const { composer } = data;
      alert(`${composer.name} is updated!`);
      getAllComposers();
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
      !(data.name === undefined)
        ? (nameSearchResults.textContent = `${data.fullName}\n${data.country}\nborn: ${data.birthYear}\ndied: ${data.deathYear}`)
        : alert(`${name} not found! Why not add a new composer?`);
    })
    .then(e.target.reset())
    .catch(console.warn);
}

// composer by country route:
function getComposerByCountry(e) {
  e.preventDefault();
  const countryName = e.target.country.value;
  fetch(`http://localhost:3000/country/${countryName}`)
    .then((res) => res.json())
    .then((data) => {
      countrySearchResults.textContent = "";
      data.composers.forEach((composer) => {
        const par = document.createElement("p");
        par.textContent = `***\n${composer.fullName}\n${composer.country}\nborn: ${composer.birthYear}\ndied: ${composer.deathYear}`;
        countrySearchResults.append(par);
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

  fetch("http://localhost:3000/", options)
    .then((res) => res.json())
    .then((data) => alert(`Composer added: ${data.fullName}`))
    .then(getAllComposers())
    .catch(console.warn);
  e.target.reset();
  // getAllComposers();
}

function deleteComposer(name) {
  const options = {
    method: "DELETE",
  };
  fetch(`http://localhost:3000/${name}`, options)
    .then(alert(`${name} was deleted`))
    .then(getAllComposers())
    .catch(console.warn);
}

function createUpdateComposerForm(data) {
  const updateForm = document.createElement("form");
  const fullNameUpdateLabel = document.createElement("label");
  const fullNameUpdateInput = document.createElement("input");
  fullNameUpdateLabel.setAttribute("for", "fullNameUpdate");
  fullNameUpdateLabel.textContent = "Full Name";
  fullNameUpdateInput.id = "fullNameUpdate";
  fullNameUpdateInput.type = "text";

  const countryUpdateLabel = document.createElement("label");
  const countryUpdateInput = document.createElement("input");
  countryUpdateLabel.setAttribute("for", "countryUpdate");
  countryUpdateLabel.textContent = "Country";
  countryUpdateInput.id = "countryUpdate";
  countryUpdateInput.type = "text";

  const birthYearUpdateLabel = document.createElement("label");
  const birthYearUpdateInput = document.createElement("input");
  birthYearUpdateLabel.setAttribute("for", "birthYearUpdate");
  birthYearUpdateLabel.textContent = "Birth Year";
  birthYearUpdateInput.id = "birthYearUpdate";
  birthYearUpdateInput.type = "number";

  const deathYearUpdateLabel = document.createElement("label");
  const deathYearUpdateInput = document.createElement("input");
  deathYearUpdateLabel.setAttribute("for", "deathYearUpdate");
  deathYearUpdateLabel.textContent = "Death Year";
  deathYearUpdateInput.id = "deathYearUpdate";
  deathYearUpdateInput.type = "number";

  const submitUpdateBtn = document.createElement("input");
  submitUpdateBtn.type = "submit";

  updateForm.append(fullNameUpdateLabel);
  updateForm.append(fullNameUpdateInput);
  updateForm.append(countryUpdateLabel);
  updateForm.append(countryUpdateInput);
  updateForm.append(birthYearUpdateLabel);
  updateForm.append(birthYearUpdateInput);
  updateForm.append(deathYearUpdateLabel);
  updateForm.append(deathYearUpdateInput);
  updateForm.append(submitUpdateBtn);

  fullNameUpdateInput.value = data.fullName;
  countryUpdateInput.value = data.country;
  birthYearUpdateInput.value = data.birthYear;
  deathYearUpdateInput.value = data.deathYear;

  return updateForm;
}
