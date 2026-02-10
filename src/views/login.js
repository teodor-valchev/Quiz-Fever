import { html, render } from "https://unpkg.com/lit-html?module";
import page from "https://unpkg.com/page/page.mjs";

import { loginRequest } from "../API/authService.js";

const loginTemplate = () => html`
    <section id="login">
        <div class="pad-large">
            <div class="glass narrow">
                <header class="tab layout">
                    <h1 class="tab-item active">Login</h1>
                    <a class="tab-item" href="/register">Register</a>
                </header>
                <form @submit=${loginHandler} class="pad-med centered">
                    <label class="block centered"
                        >Email:
                        <input
                            class="auth-input input"
                            type="text"
                            name="email"
                    /></label>
                    <label class="block centered"
                        >Password:
                        <input
                            class="auth-input input"
                            type="password"
                            name="password"
                    /></label>
                    <input
                        class="block action cta"
                        type="submit"
                        value="Sign In"
                    />
                </form>
                <footer class="tab-footer">
                    Don't have an account?
                    <a class="invert" href="/register">Create one here</a>.
                </footer>
            </div>
        </div>
    </section>
`;

export const loginView = (ctx) => {
    render(loginTemplate(), ctx.render);
};

async function loginHandler(e) {
    e.preventDefault();

    try {
        const data = new FormData(e.target);
        const { email, password } = Object.fromEntries(data);

        if (email == "" || password == "") {
            throw new Error("All fields are required!");
        }

        const res = await loginRequest(email, password);

        if (!res) {
            throw new Error("Wrong email or password");
        }

        page.redirect("/");
    } catch (err) {
        alert(err.message);
    }
}
