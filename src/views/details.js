import { html, render } from "https://unpkg.com/lit-html?module";

import { getQuizDetails } from "../API/back4app.js";
import { isAuth } from "./nav.js";

//TODO: add description, owner, attempts

const detailsTemplate = (title, topic, questionCount, isAuth) =>
    html` <section id="details">
        <div class="pad-large alt-page">
            <article class="details">
                <h1>${title}</h1>
                <span class="quiz-topic"
                    >A quiz by <a href="#">Peter</a> on the topic of
                    ${topic}</span
                >
                <div class="quiz-meta">
                    <span>${questionCount} Questions</span>
                    <span>|</span>
                    <span>Taken 189 times</span>
                </div>
                <p class="quiz-desc">
                    Test your knowledge of XML by completing this
                    medium-difficulty quiz. Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Aliquam recusandae corporis
                    voluptatum quibusdam maxime similique reprehenderit rem,
                    officia vero at.
                </p>
                ${isAuth
                    ? html` <div>
                          <a class="cta action" href="#">Begin Quiz</a>
                      </div>`
                    : html`<span>Log in to take the quiz!</span>`}
            </article>
        </div>
    </section>`;

export const quizDetailsView = async (ctx) => {
    const id = ctx.params.id;

    const quiz = await getQuizDetails(id);
    const title = quiz.get("title");
    const topic = quiz.get("topic");
    const questionCount = quiz.get("questionCount");

    render(
        detailsTemplate(title, topic, questionCount, await isAuth()),
        ctx.render,
    );
};
