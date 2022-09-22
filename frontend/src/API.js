import axios from 'axios';
import { apiUrl } from './config';

/**
 * GET COUNTRY
 */
export const getCountry = async (name) => {
  try {
    const response = await axios({
      url: `https://restcountries.com/v2/name/${name}`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (err) {
    return { error: err.response.data.message || err.message };
  }
};

/**
 * REGISTER
 */
export const register = async ({ userName, email, country, password }) => {
  try {
    const response = await axios({
      url: `${apiUrl}/api/users/register`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        userName,
        email,
        country,
        password,
      },
    });
    if (response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    return { error: err.response.data.message || err.message };
  }
};

/**
 * LOGIN
 */
export const signin = async ({ userName, password }) => {
  try {
    const response = await axios({
      url: `${apiUrl}/api/users/signin`,
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
      },
      data: {
        userName,
        password,
      },
    });
    return response.data;
  } catch (err) {
    return { error: err.response.data.message || err.message };
  }
};

/**
 * get all users
 */

export const getUsers = async () => {
  try {
    const response = await axios({
      url: `${apiUrl}/api/users/all`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (err) {
    return { error: err.response.data.message || err.message };
  }
};

/**
 * get user
 */
export const getUser = async (id) => {
  try {
    const response = await axios({
      url: `${apiUrl}/api/users/${id}`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (err) {
    return { error: err.response.data.message || err.message };
  }
};
/**
 * set new highest score
 */

export const setNewHighestScore = async (id, newRecord) => {
  try {
    const response = await axios({
      url: `${apiUrl}/api/users/${id}`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        newRecord,
      },
    });
    return response.data;
  } catch (err) {
    return { error: err.response.data.message || err.message };
  }
};
