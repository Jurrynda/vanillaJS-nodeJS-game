/**
 * api
 */
import { signin } from '../API';

/**
 * local storage
 */
import { saveUserInfo } from '../localStorage';

const LoginPage = {
  render: () => `
    <form id="login-form" class="login-and-register-form">
        <h2>Sign-in</h2>
        <div class="form-inputs-container">
            <div class="login-input-container">
                <input class="login-input" type="text" id="login-name" name="login-name"></input>
                <label class="login-label" for="login-name">Username</label>
            </div>
            <div class="login-input-container">
                <input class="login-input" type="password" id="login-password" name="login-password"></input>
                <label class="login-label" for="login-password">Password</label>
            </div>
        </div>
        <button class="form-button" type="submit">Sign-in</button>
        <div class="login-link-container">
            <span>New player?</span>
            <a href="/#/register">Create you acount</a>
        </div>
    </form>
    `,
  after_render: () => {
    document.getElementById('login-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = await signin({
        userName: document.getElementById('login-name').value,
        password: document.getElementById('login-password').value,
      });
      if (data.error) {
        alert(data.error);
        return;
      }
      saveUserInfo(data);
      document.location.hash = '/';
    });
  },
};

export default LoginPage;
