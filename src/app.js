import page from "../node_modules/page/page.mjs";
import { homeView } from "./views/home.js";

const rootElement = document.getElementById("content");

page("*", renderContainer);
page("/", homeView);

function renderContainer(ctx, next) {
    ctx.render = rootElement;
    next();
}

page.start();
