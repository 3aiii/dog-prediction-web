import { HOST_URL } from "../secret";
import axios from "./../../node_modules/axios/lib/axios";
import { get } from "./userService";

export const gets = async() => {
    return get(`dog`)
}