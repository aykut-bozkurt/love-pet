import jwt from 'jsonwebtoken';
import config from "./config.js";

export function signToken(payload){
    const token = jwt.sign(payload, config.token_key, {expiresIn: "2h"});
    return token;
}

export const verifyToken = (req, res, next) => {
    try {
        const token = req.headers["authorization"];
        if (!token) {
            return res.status(403).send("A token is required for authentication");
        }

        const decoded = jwt.verify(token, config.TOKEN_KEY);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }

    return next();
}

export const validatePassword = (value) => {
    let message = '';
    if (value.length < 7) {
        message += "Your password needs a minimum of seven characters.";
    }
    if (value.length > 14) {
        message += "Your password needs a maximum of fourteen characters.";
    }
    if (value.search(/[a-z]/) == -1) {
        message += "Your password needs at least one lower case letter.";
    }
    if (value.search(/[A-Z]/) == -1) {
        message += "Your password needs at least one upper case letter.";
    }
    if (value.search (/[0-9]/) == -1) {
        message += "Your password needs a number.";
    }
    if (value.search(/^[a-zA-Z0-9_]{7,14}$/) == -1) {
        message += "Your password should only consist alphanumeric characters of length between 7 and 14!";
    }

    return [message === '', message];
}

export const validateUsername = (value) => {
    let message = '';
    if (value.search(/^[a-zA-Z0-9-_]{7,14}$/) == -1) {
        message = "Your password should only consist alphanumeric characters of length between 7 and 14!";
    }

    return [message === '', message];
}
