/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
/* eslint-disable indent */

/**
 * api
 */
import { getCountry, register } from '../API';

const RegisterPage = {
  render: () => `
    <form id="register-form" class="login-and-register-form">
      <div class="register-form-header-container">
        <a href="/#/signin">
          <i class="fa-solid fa-angle-left"></i>
        </a>
        <h2>Create acount</h2>
      </div>
      <div class="form-inputs-container">
          <div class="login-input-container">
              <input class="login-input" type="text" id="register-name" name="register-name"></input>
              <label class="login-label" for="register-name">Username</label>
          </div>
          <div class="login-input-container">
              <input class="login-input" type="email" id="register-email" name="register-email"></input>
              <label class="login-label" for="register-email">E-mail</label>
          </div>
      </div>
      <div class="form-inputs-container">
          <div class="login-input-container country-input-container">
              <input class="login-input" type="text" id="register-country" name="register-country"></input>
              <label class="login-label" id="register-country-label" for="register-country">Country</label>
          </div>
          <div class="login-input-container">
              <input class="login-input" type="password" id="register-password" name="register-password"></input>
              <label class="login-label" for="register-password">Password</label>
          </div>
      </div>
      <button class="form-button" type="submit">Sign-up</button>
    </form>
    `,
  after_render: () => {
    let countryValue;

    /**
     * extract country data
     */
    const extractCountryData = (country) => {
      return {
        name: country.name,
        shortName: country.alpha2Code,
        flag: country.flag,
      };
    };

    /**
     * if countries.length > 5 take return only 5
     */
    const getOnlyFiveCountries = (countries) => {
      const fiveCountries = [];
      for (let i = 0; i <= 4; i++) {
        fiveCountries.push(countries[i]);
      }
      return fiveCountries;
    };

    /**
     * hide or show country input and label
     */
    const countryInput = document.getElementById('register-country');
    const countryLabel = document.getElementById('register-country-label');
    const hideOrShowCountryInput = {
      hide: () => {
        countryInput.style.display = 'none';
        countryLabel.style.display = 'none';
      },
      show: () => {
        document.querySelector('.countries-container').remove();
        countryInput.style.display = 'block';
        countryLabel.style.display = 'block';
        countryInput.value = '';
      },
    };

    /**
     * add event listener for cancel
     */
    const addEventForCancel = () => {
      document.querySelector('.cancel').addEventListener('click', () => {
        hideOrShowCountryInput.show();
      });
    };

    /**
     * add event listener for each country option
     */
    const addEventOnChange = (countries) => {
      document.querySelectorAll('.country').forEach((country) => {
        country.addEventListener('change', (e) => {
          const selectedCountry = countries.find(
            (cntry) => cntry.name === e.target.value,
          );
          hideOrShowCountryInput.show();
          sendCountryOnPage(selectedCountry);
        });
      });
    };

    /**
     * if countries length > 1 show these options
     */
    const countryInputContainer = document.querySelector('.country-input-container');
    const sendCountriesOnPage = (countries) => {
      hideOrShowCountryInput.hide();

      const countriesTemplate = `
        <div class="countries-container">
        <i class="fa-solid fa-arrow-left-long cancel-register cancel"></i>
        <div class="register-country-title">Choose your country</div>
          ${countries
            .map(
              (country) => `
              <label for="${country.shortName}" class="country">
                <input id="${country.shortName}" type="radio" name="country" value="${country.name}">
                <div>${country.name}</div>
                <img class="register-country-img" src=${country.flag}>
              </label>
            `,
            )
            .join('\n')}
        </div>
      `;

      countryInputContainer.insertAdjacentHTML('beforeend', countriesTemplate);
      addEventForCancel();
      addEventOnChange(countries);
    };

    /**
     * send country on page a save country value
     */
    const sendCountryOnPage = async (country) => {
      hideOrShowCountryInput.hide();
      countryInput.value = country.name;

      const countryTemplate = `
        <div class="countries-container">
          <div class="country">
            <div class="register-country-title">Country</div>
            <i class="fa-solid fa-arrow-left-long cancel"></i>
            <div>${country.name}</div>
            <img src="${country.flag}" alt="flag of ${country.name}" class="register-country-img">
          </div>
        </div>
      `;

      countryInputContainer.insertAdjacentHTML('beforeend', countryTemplate);
      addEventForCancel();
      countryValue = country;
    };

    /**
     * find country after input change
     */
    document.getElementById('register-country').addEventListener('change', async (e) => {
      let countries = await getCountry(e.target.value);

      if (countries.error && e.target.value !== '') {
        alert(`We couldnt find country name "${e.target.value}"`);
        document.getElementById('register-country').value = '';
      }

      if (countries.length > 5) countries = getOnlyFiveCountries(countries);

      countries = countries.map((country) => extractCountryData(country));

      if (countries.length === 1) sendCountryOnPage(countries[0]);
      else sendCountriesOnPage(countries);
    });

    /**
     * clean inputs
     */
    const cleanInputs = () => {
      hideOrShowCountryInput.show();
      document.querySelectorAll('.login-input').forEach((input) => {
        input.value = '';
      });
    };

    /**
     * send values
     */
    document.getElementById('register-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = await register({
        userName: document.getElementById('register-name').value,
        email: document.getElementById('register-email').value,
        country: countryValue,
        password: document.getElementById('register-password').value,
      });
      if (data.error) {
        alert(data.error);
        return;
      }
      cleanInputs();
      document.location.hash = '/signin';
    });
  },
};
export default RegisterPage;
