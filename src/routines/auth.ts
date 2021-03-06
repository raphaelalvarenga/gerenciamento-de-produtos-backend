import jwt from "jsonwebtoken";
import RequestInterface from "../interfaces/request-interface";
import ResponseInterface from "../interfaces/response-interface";

// Validating the token passed by the front end
const auth = (request: RequestInterface, response: ResponseInterface): ResponseInterface => {
    
    // Creating an array of validations. It will store just "trues" and "falses" so it can be checked later
    const conditions: boolean[] = [
        !request.token,
        request.token === "",
        request.token === null
    ];
    
    // If token doesn't exist or is empty or is null...
    if (conditions.includes(true)) {
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