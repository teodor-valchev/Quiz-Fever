import { config } from "./keys.js";

async function InitializeBack4AppConnection() {
    Parse.initialize(config.appId, config.jsKey);
    Parse.serverURL = config.serverUrl;
    // Peter ID: LoEqVbURO9
    const query = new Parse.Query("User");

    try {
        const player = await query.get("LoEqVbURO9");
        console.log(player);
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
async function signIn() {
    try {
        const user = Parse.User.current();

        if (!user) {
            return;
        }

        return user;
    } catch (error) {
        alert("Error: " + error.code + " " + error.message);
        return error.code;
    }
}

export { InitializeBack4AppConnection, signUp, signIn };
