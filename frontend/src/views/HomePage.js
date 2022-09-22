/**
 * local storage
 */
import { deleteUserInfo, getUserInfo } from '../localStorage';

const HomePage = {
  render: () => {
    const user = getUserInfo();
    if (!user) {
      document.location.hash = '/signin';
    }
    return `
    <nav class="home-container">
      <ul class="home-ul">
        <li>
          <a href="/#/game/${user._id}">Start</a>
        </li>
        <li>
          <a href="/#/score">Score</a>
        </li>
        <li>
          <a href="/#/settings">Settings</a>
        </li>
        <li>
          <a id="quit">Quit</a>
        </li>
      </ul>
    </nav>
  `;
  },

  after_render: () => {
    document.getElementById('quit').addEventListener('click', () => {
      deleteUserInfo();
      document.location.hash = '/signin';
    });
  },
};
export default HomePage;
