import { config } from "./keys.js";

async function InitializeBack4AppConnection() {
    try {
        Parse.initialize(config.appId, config.jsKey);
        Parse.serverURL = config.serverUrl;
    } catch (error) {
        console.error("Error retrieving object: " + error.message);
    }
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

async function getAllQuizzes() {
    try {
        const Quizzes = Parse.Object.extend("Quizzes");
        const query = new Parse.Query(Quizzes);

        query.equalTo("topic", "history");
        const results = await query.find();

        console.log(results);
        return results;
    } catch (error) {
        alert("Error: " + error.code + " " + error.message);
        return null;
    }
}

export { InitializeBack4AppConnection, signUp, signIn, getAllQuizzes };
