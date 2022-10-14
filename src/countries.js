import Notiflix from 'notiflix';
import { inputName } from './index';

const insertList = document.querySelector('.country-list');

function callFetch() {
  if (inputName === '') {
    removeAllChildNodes(insertList);
    return;
  }
  fetch(
    `https://restcountries.com/v2/name/${inputName}?fields=name,flag,capital,population,languages `
  )
    .then(responce => {
      if (!responce.ok) {
        throw new Error();
      }
      return responce.json();
    })
    .then(countries => {
      createCountries(countries);
    })
    .catch(onFetcherror);
}

function createCountries(countries) {
  let markUp = '';

  if (countries.length === undefined) {
    markUp = '';
  } else if (countries.length === 1) {
    markUp = countries
      .map(({ name, flag, capital, population, languages }) => {
        const languagesName = Object.values(languages);
        let lang = '';
        languagesName.forEach(language => {
          lang += language.name;
        });
        return `
  <img class="gallery__image" src="${flag} " alt="${name}" width='300' hight='200'/>
  <p>${name} </p>
  <p>${capital} </p>
  <p>${population} </p>
    <p>${lang} </p>`;
      })
      .join('');
  } else if (countries.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else {
    markUp = countries
      .map(({ name, flag }) => {
        return `
  <img class="gallery__image" src="${flag}" alt="${name}" width='60' hight='40'/>
  <p>${name} </p>`;
      })
      .join('');
  }
  insertList.innerHTML = markUp;
}

function onFetcherror(error) {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}

function removeAllChildNodes(insertList) {
  while (insertList.firstChild) {
    insertList.removeChild(insertList.firstChild);
  }
}

export { callFetch };