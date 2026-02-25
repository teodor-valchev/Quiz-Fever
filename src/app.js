import page from "https://unpkg.com/page/page.mjs";

import { homeView } from "./views/home.js";
import { registerView } from "./views/register.js";
import { loginView } from "./views/login.js";

import { InitializeBack4AppConnection } from "./API/back4app.js";
import { notFoundView } from "./views/notFound.js";
import { navView } from "./views/nav.js";
import { browseView } from "./views/browse.js";

const rootElement = document.getElementById("content");
const navElement = document.getElementById("titlebar");

// Establishing connection to back4app backend
InitializeBack4AppConnection();

page("*", renderContainer);

//TODO: think about how you can make it work on production
//page("/Quiz-Fever/", () => page.redirect("/"));

page("/", navView, homeView);

page("/browse", browseView);
page("/register", registerView);
page("/login", loginView);
page("/404", notFoundView);

function renderContainer(ctx, next) {
    ctx.render = rootElement;
    ctx.navigation = navElement;

    next();
}

page.start();
