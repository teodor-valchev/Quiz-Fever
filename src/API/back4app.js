import { config } from "./keys.js";
async function InitializeBack4AppConnection() {
    Parse.initialize(config.appId, config.jsKey);
    Parse.serverURL = config.serverUrl;
    // Peter ID: LoEqVbURO9
    const query = new Parse.Query("Users");

    try {
        const player = await query.get("LoEqVbURO9");
        console.log(player);
    } catch (error) {
        console.error("Error retrieving object: " + error.message);
    }
}

export { InitializeBack4AppConnection };
