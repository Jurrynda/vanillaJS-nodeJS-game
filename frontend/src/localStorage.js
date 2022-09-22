/**
 * User
 */
export const saveUserInfo = (user) => {
  localStorage.setItem('userInfo', JSON.stringify(user));
};

export const getUserInfo = () => {
  return JSON.parse(localStorage.getItem('userInfo'));
};

export const deleteUserInfo = () => {
  localStorage.removeItem('userInfo');
};

/**
 * game settings
 */
export const saveGameSettings = (settings) => {
  localStorage.setItem('settings', JSON.stringify(settings));
};

export const getGameSettings = () => {
  return JSON.parse(localStorage.getItem('settings'));
};

export const deleteGameSettings = () => {
  localStorage.removeItem('settings');
};
