import page from "https://unpkg.com/page/page.mjs";

import { homeView } from "./views/home.js";
import { registerView } from "./views/register.js";
import { loginView } from "./views/login.js";

import { initializeBack4App } from "./API/back4app.js";
import { notFoundView } from "./views/notFound.js";
import { navView } from "./views/nav.js";
import { browseView } from "./views/browse.js";
import { quizDetailsView } from "./views/details.js";

const rootElement = document.getElementById("content");
const navElement = document.getElementById("titlebar");

const redirect = sessionStorage.redirect;
if (redirect) {
    delete sessionStorage.redirect;
    history.replaceState(null, null, redirect);
}

// Establishing connection to back4app backend
initializeBack4App().then(() => {
    console.log("App is ready");
});

page("*", renderContainer);

//TODO: think about how you can make it work on production
//page("/Quiz-Fever/", () => page.redirect("/"));

page("/", navView, homeView);

page("/browse", browseView);
page("/register", registerView);
page("/login", loginView);
page("/details/:id", quizDetailsView);
page("/404", notFoundView);

function renderContainer(ctx, next) {
    ctx.render = rootElement;
    ctx.navigation = navElement;

    next();
}

page.start();
