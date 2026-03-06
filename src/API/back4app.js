async function initializeBack4App() {
    Parse.initialize(
        "zpxinHuWZtScpiIaxsxFBiWZ4dE2rc10DBtWGb0z",
        "MmBPkPaQnl9pddP2iOrVo5E25AYa3mdE07jQqubS",
    );
    Parse.serverURL = "https://parseapi.back4app.com/";
}

//Register a new user
async function signUp(data) {
    try {
        const user = new Parse.User();
        await user.set("username", data.username);
        await user.set("password", data.password);
        await user.set("email", data.email);

        await user.save();

        return user;
    } catch (error) {
        alert("Error: " + error.code + " " + error.message);
        return error.code;
    }
}

// Login Check
async function signIn(email, password) {
    try {
        await Parse.User.logIn(email, password);
    } catch (error) {
        alert("Error: " + error.code + " " + error.message);
        return error.code;
    }
}

async function isLoggedIn() {
    const currentUser = Parse.User.current();
    return !!currentUser;
}

function logout() {
    Parse.User.logOut().then(() => {
        Parse.User.current();
    });
}

async function getAllQuizzes() {
    try {
        const Quizzes = Parse.Object.extend("Quizzes");
        const query = new Parse.Query(Quizzes);

        const results = await query.find();

        return results;
    } catch (error) {
        alert("Error: " + error.code + " " + error.message);
        return null;
    }
}

async function getQuizDetails(id) {
    try {
        const Quizzes = Parse.Object.extend("Quizzes");
        const query = new Parse.Query(Quizzes);

        query.equalTo("objectId", id);

        const quiz = await query.first();

        return quiz;
    } catch (error) {
        alert("Error: " + error.code + " " + error.message);
        return null;
    }
}

async function createQuiz(title, topic) {
    try {
        const Quizzes = Parse.Object.extend("Quizzes");
        const quiz = new Quizzes();

        await quiz.set("title", title);
        await quiz.set("topic", topic);

        await quiz.save();

        return quiz;
    } catch (error) {
        alert("Error: " + error.code + " " + error.message);
        return null;
    }
}

export {
    initializeBack4App,
    signUp,
    signIn,
    getAllQuizzes,
    getQuizDetails,
    createQuiz,
    isLoggedIn,
    logout,
};
