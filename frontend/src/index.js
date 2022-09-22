import ConfettiGenerator from "confetti-js";
import { parseRequestUrl } from "./utils";

/**
 * views
 */
import Error404Page from "./views/Error404Page";
import HomePage from "./views/HomePage";
import LoginPage from "./views/LoginPage";
import RegisterPage from "./views/RegisterPage";
import GamePage from "./views/GamePage";
import ScorePage from "./views/ScorePage";
import SettingsPage from "./views/SettingsPage";

/**
 * styles
 */
// import "./index.scss";

/**
 * set background
 */
const setBackground = () => {
  const confettiSettings = { target: "background-canvas" };
  const confetti = new ConfettiGenerator(confettiSettings);
  confetti.render();
};
setBackground();

/**
 * ROUTER
 */
const routes = {
  "/": HomePage,
  "/signin": LoginPage,
  "/register": RegisterPage,
  "/score": ScorePage,
  "/settings": SettingsPage,
  "/game/:id": GamePage,
};

const router = async () => {
  const request = parseRequestUrl();

  const parseUrl =
    (request.resource ? `/${request.resource}` : "/") +
    (request.id ? "/:id" : "");

  const page = routes[parseUrl] ? routes[parseUrl] : Error404Page;

  const mainContainer = document.getElementById("main-container");
  mainContainer.innerHTML = await page.render();

  if (page.after_render) {
    page.after_render();
  }
};

window.addEventListener("load", router);
window.addEventListener("hashchange", router);
