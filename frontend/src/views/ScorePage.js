/* eslint-disable indent */

/**
 * api
 */
import { getUsers } from '../API';

/**
 * local storage
 */
import { getUserInfo } from '../localStorage';

const ScorePage = {
  render: async () => {
    const users = await getUsers();
    const { userName } = getUserInfo();
    const compareUsersScore = (a, b) => {
      if (a.highestScore > b.highestScore) return -1;
      if (a.highestScore < b.highestScore) return 1;
      return 0;
    };
    users.sort(compareUsersScore);

    let ranking = 1;
    return `
            <div class="score-container">
               <i id="cancel-score-page" class="fa-solid fa-arrow-left-long cancel-score"></i>
                <table class="score-table">
                  <tr class="score-table-header">
                    <th>Ranking</th>
                    <th>Username</th>
                    <th>Country</th>
                    <th>Flag</th>
                    <th>Best score</th>
                  </tr>
                ${users
                  .map(
                    (user) => `
                    
                    <tr class="score-row">
                      <td>
                        ${ranking++}
                      </td>
                      <td>
                        ${
                          user.userName === userName
                            ? `<div class="gold">${user.userName}</div>`
                            : user.userName
                        }
                      </td>
                      <td>
                        <div>
                          ${user.country.name}
                        </div>
                      </td>
                      <td>
                        <img class="score-flag" src="${user.country.flag}">
                      </td>
                      <td>
                        ${user.highestScore}
                      </td>
                    </tr>
                  `,
                  )
                  .join('\n')}
                </table>
            </div>
        `;
  },
  after_render: () => {
    document.getElementById('cancel-score-page').addEventListener('click', () => {
      document.location.hash = '/';
    });
  },
};
export default ScorePage;
