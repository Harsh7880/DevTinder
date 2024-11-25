
import validator from "validator";

export const validateUserFields = (req) => {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName) {
        throw new Error("First Name or Last Name can not be empty");
    }

    if (!validator.isEmail(email)) {
        throw new Error("Email is Invalid : " + email);
    } if (!validator.isStrongPassword(password)) {
        throw new Error("Please Enter an Strong Password");
    }
}