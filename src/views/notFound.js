import { html, render } from "https://unpkg.com/lit-html?module";

const notFoundTemplate = () => html`
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
            />
            <title>404 Not Found</title>
            <link rel="stylesheet" href="./static/notfound.css" />
        </head>

        <body>
            <div class="pattern"></div>

            <div class="wrapper">
                <div class="logo">❓</div>
                <h1>404 — Page Not Found</h1>
                <p>Looks like this page wandered off into the void.</p>
                <a href="/">Take me home</a>
                <div class="code">Error code: LOST_IN_SPACE</div>
            </div>
        </body>
    </html>
`;

export const notFoundView = (ctx) => {
    render(notFoundTemplate(), ctx.render);
};
