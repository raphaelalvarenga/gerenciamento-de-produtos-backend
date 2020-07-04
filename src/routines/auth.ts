import jwt from "jsonwebtoken";
import RequestInterface from "../interfaces/request-interface";
import ResponseInterface from "../interfaces/response-interface";

// Validating the token passed by the front end
const auth = (request: RequestInterface, response: ResponseInterface): ResponseInterface => {
    
    // If token doesn't exist or it's empty...
    if (!request.token || request.token === "") {
        response = { ...response, message: "No-token" };
    } else {

        // Check the validation of the token passed
        jwt.verify(request.token, "adopetsChallenge", (error) => {
            response = error ? { ...response, message: "Invalid-token", params: {} } : { ...response, success: true };
        })
    }

    return response;
}

export default auth;