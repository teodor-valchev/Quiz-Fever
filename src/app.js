import page from "https://unpkg.com/page/page.mjs";
import { homeView } from "./views/home.js";
import { InitializeBack4AppConnection } from "./API/back4app.js";

const rootElement = document.getElementById("content");

// Establishing connection to back4app backend
InitializeBack4AppConnection();

page("*", renderContainer);

//TODO: think about how you can make it work on production
page("/Quiz-Fever/", () => page.redirect("/"));

page("/", homeView);

function renderContainer(ctx, next) {
    ctx.render = rootElement;
    next();
}

page.start();
