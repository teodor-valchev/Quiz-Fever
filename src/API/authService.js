import { signIn } from "./back4app.js";

const BASE_URL = "http://localhost:3030/users";

export const loginRequest = async (email, password) => {
    try {
        const data = {
            email,
            password,
        };
        const response = await fetch(`${BASE_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const user = await response.json();

            const result = await signIn();

            if (result == 202 || result == 203) {
                return;
            }

            localStorage.setItem("accessToken", user.accessToken);
            return user;
        }
    } catch (error) {
        alert(error.message);
    }
};
