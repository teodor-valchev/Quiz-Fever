import { html, render } from "https://unpkg.com/lit-html?module";
import page from "https://unpkg.com/page/page.mjs";

import { signUp } from "../API/back4app.js";

const registerTemplate = () => html`
    <section id="register">
        <div class="pad-large">
            <div class="glass narrow">
                <header class="tab layout">
                    <a class="tab-item" href="/Quiz-Fever/login">Login</a>
                    <h1 class="tab-item active">Register</h1>
                </header>
                <form @submit=${registerHandler} class="pad-med centered">
                    <label class="block centered"
                        >Username:
                        <input
                            class="auth-input input"
                            type="text"
                            name="username"
                    /></label>
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
                    <label class="block centered"
                        >Repeat:
                        <input
                            class="auth-input input"
                            type="password"
                            name="repass"
                    /></label>
                    <input
                        class="block action cta"
                        type="submit"
                        value="Create Account"
                    />
                </form>
                <footer class="tab-footer">
                    Already have an account?
                    <a class="invert" href="/Quiz-Fever/login">Sign in here</a>.
                </footer>
            </div>
        </div>
    </section>
`;

export const registerView = (ctx) => {
    render(registerTemplate(), ctx.render);
};

async function registerHandler(e) {
    e.preventDefault();

    try {
        const data = new FormData(e.target);
        const { username, email, password, repass } = Object.fromEntries(data);

        if (username == "" || email == "" || password == "" || repass == "") {
            throw new Error("All fields are required!");
        }

        if (password !== repass) {
            throw new Error("Password mismatch!");
        }
        const singUpData = {
            username,
            email,
            password,
        };

        const res = await signUp(singUpData);

        if (!res) {
            throw new Error("Wrong email or password!");
        }

        page.redirect("/Quiz-Fever");
    } catch (err) {
        alert(err.message);
    }
}
