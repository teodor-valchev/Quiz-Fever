import { html, render } from "https://unpkg.com/lit-html?module";
import { createQuiz } from "../API/back4app.js";

let answers = [];

const createTemplate = (quizCreate) =>
    html`<section id="editor">
        <header class="pad-large">
            <h2>Questions</h2>
        </header>

        ${quizCreate()}
            <div class='question-container'></div>

            <article class="editor-question">
                <div class="editor-input">
                    <button @click=${addQuestionHandler} class="input submit action">
                        <i class="fas fa-plus-circle"></i>
                        Add question
                    </button>
                </div>
            </article>
        </div>
    </section>`;

const quizCreate = () =>
    html` <div class="pad-large alt-page">
        <form @submit=${quizCreateHandler}>
            <label class="editor-label layout">
                <span class="label-col">Title:</span>
                <input class="input i-med" type="text" name="title"
            /></label>
            <label class="editor-label layout">
                <span class="label-col">Topic:</span>
                <select class="input i-med" name="topic">
                    <option value="all">All Categories</option>
                    <option value="it">Languages</option>
                    <option value="hardware">Hardware</option>
                    <option value="software">Tools and Software</option>
                </select>
            </label>
            <input class="input submit action" type="submit" value="Save" />
        </form>
    </div>`;

const quizCreateHandler = async (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    const { title, topic } = Object.fromEntries(data);

    if (!title) {
        alert("Insert title!");
        return;
    }

    const quiz = await createQuiz(title, topic);

    console.log(quiz);
};

const deleteAnswerHandler = (id) => {
    console.log(id);

    const answer = document.querySelector(
        `input[name="answer-${id}"]`,
    ).parentNode;
    answer.remove();
};

//TODO: FIX RENDERING
const addAnswerHandler = (e) => {
    e.preventDefault();

    answers.push({
        id: Date.now(),
        value: "",
    });

    updateQuestionForm();
};

function updateQuestionForm() {
    const answerContainer = document.querySelector(".answer-container");

    const template = html`
        ${answers.map(
            (a) => html`
                <div class="editor-input ${a.id}">
                    <label class="radio">
                        <input
                            class="input"
                            type="radio"
                            name="correct"
                            value="${a.id}"
                        />
                        <i class="fas fa-check-circle"></i>
                    </label>

                    <input class="input" type="text" name="answer-${a.id}" />

                    <button
                        @click=${() => deleteAnswerHandler(a.id)}
                        class="input submit action"
                    >
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            `,
        )}
    `;

    render(template, answerContainer);
}

const questionCreateHandler = async (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    const { title, topic } = Object.fromEntries(data);

    if (!title) {
        alert("Insert title!");
        return;
    }
};

const addQuestionHandler = (e) => {
    e.preventDefault();
    const questionContainer = document.querySelector(".question-container");
    render(addQuestionTemplate(), questionContainer);
};

export const createView = (ctx) => {
    render(createTemplate(quizCreate, addAnswerHandler), ctx.render);
};

const addQuestionTemplate = () =>
    html` <div class="pad-large alt-page">
        <article class="editor-question">
            <div class="layout">
                <div class="question-control">
                    <button class="input submit action">
                        <i class="fas fa-check-double"></i> Save
                    </button>
                    <button class="input submit action">
                        <i class="fas fa-times"></i> Cancel
                    </button>
                </div>
                <h3>Question 1</h3>
            </div>
            <form class="question-form" @submit=${questionCreateHandler}>
                <textarea
                    class="input editor-input editor-text"
                    name="text"
                    placeholder="Enter question"
                ></textarea>

                <div class="answer-container"></div>

                <div class="editor-input answer-btn">
                    <button
                        @click=${addAnswerHandler}
                        class="input submit action"
                    >
                        <i class="fas fa-plus-circle"></i>
                        Add answer
                    </button>
                </div>
            </form>
        </article>
    </div>`;

//EDITOR QUESTION TEMPLATE

// html` <article class="editor-question">
//     <div class="layout">
//         <div class="question-control">
//             <button class="input submit action">
//                 <i class="fas fa-edit"></i> Edit
//             </button>
//             <button class="input submit action">
//                 <i class="fas fa-trash-alt"></i> Delete
//             </button>
//         </div>
//         <h3>Question 2</h3>
//     </div>
//     <form>
//         <p class="editor-input">This is the second question.</p>
//         <div class="editor-input">
//             <label class="radio">
//                 <input
//                     class="input"
//                     type="radio"
//                     name="question-2"
//                     value="0"
//                     disabled
//                 />
//                 <i class="fas fa-check-circle"></i>
//             </label>
//             <span>Answer 0</span>
//         </div>
//         <div class="editor-input">
//             <label class="radio">
//                 <input
//                     class="input"
//                     type="radio"
//                     name="question-2"
//                     value="1"
//                     disabled
//                 />
//                 <i class="fas fa-check-circle"></i>
//             </label>
//             <span>Answer 1</span>
//         </div>
//         <div class="editor-input">
//             <label class="radio">
//                 <input
//                     class="input"
//                     type="radio"
//                     name="question-2"
//                     value="2"
//                     disabled
//                 />
//                 <i class="fas fa-check-circle"></i>
//             </label>
//             <span>Answer 2</span>
//         </div>
//     </form>
// </article>`;

//Load Create Question

// html`<article class="editor-question">
//     <div class="layout">
//         <div class="question-control">
//             <button disabled class="input submit action">
//                 <i class="fas fa-check-double"></i> Save
//             </button>
//             <button disabled class="input submit action">
//                 <i class="fas fa-times"></i> Cancel
//             </button>
//         </div>
//         <h3>Question 1</h3>
//     </div>
//     <form>
//         <textarea
//             disabled
//             class="input editor-input editor-text"
//             name="text"
//             placeholder="Enter question"
//         ></textarea>
//         <div class="editor-input">
//             <label class="radio">
//                 <input
//                     disabled
//                     class="input"
//                     type="radio"
//                     name="question-1"
//                     value="0"
//                 />
//                 <i class="fas fa-check-circle"></i>
//             </label>

//             <input disabled class="input" type="text" name="answer-0" />
//             <button disabled class="input submit action">
//                 <i class="fas fa-trash-alt"></i>
//             </button>
//         </div>
//         <div class="editor-input">
//             <label class="radio">
//                 <input
//                     disabled
//                     class="input"
//                     type="radio"
//                     name="question-1"
//                     value="1"
//                 />
//                 <i class="fas fa-check-circle"></i>
//             </label>

//             <input disabled class="input" type="text" name="answer-1" />
//             <button disabled class="input submit action">
//                 <i class="fas fa-trash-alt"></i>
//             </button>
//         </div>
//         <div class="editor-input">
//             <label class="radio">
//                 <input
//                     disabled
//                     class="input"
//                     type="radio"
//                     name="question-1"
//                     value="2"
//                 />
//                 <i class="fas fa-check-circle"></i>
//             </label>

//             <input disabled class="input" type="text" name="answer-2" />
//             <button disabled class="input submit action">
//                 <i class="fas fa-trash-alt"></i>
//             </button>
//         </div>
//         <div class="editor-input">
//             <button disabled class="input submit action">
//                 <i class="fas fa-plus-circle"></i>
//                 Add answer
//             </button>
//         </div>
//     </form>
//     <div class="loading-overlay working"></div>
// </article>`;
