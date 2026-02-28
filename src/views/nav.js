import { html, render } from "https://unpkg.com/lit-html?module";
import page from "https://unpkg.com/page/page.mjs";

import { isLoggedIn, logout } from "../API/back4app.js";

const navTemplate = (isAuth) => html`
    <nav>
        <a class="logotype" href="/">
            <i class="fas fa-question-circle"></i>
            <i class="merge fas fa-check-circle"></i>
            <span>Quiz Fever</span>
        </a>

        <div class="navigation">
            <a class="nav-link" href="/browse">Browse</a>

            ${isAuth
                ? html` <div id="user-nav">
                      <a class="nav-link" href="/create">Create</a>
                      <a class="nav-link profile-link" href="#">
                          <i class="fas fa-user-circle"></i>
                      </a>
                      <a
                          id="logoutBtn"
                          class="nav-link"
                          href="javascript:void(0)"
                          @click=${logoutHandler}
                      >
                          Logout
                      </a>
                  </div>`
                : html` <div id="guest-nav">
                      <a class="nav-link" href="/login">Sign in</a>
                  </div>`}
        </div>
    </nav>
`;

export const isAuth = () => isLoggedIn();

export const navView = async (ctx, next) => {
    render(navTemplate(await isAuth()), ctx.navigation);
    next();
};

//TODO: Maybe i have to do something with the session in back4app???
const logoutHandler = () => {
    logout();
    page.redirect("/");
};
