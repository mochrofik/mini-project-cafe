
import { environment } from "../constants/environment";
import type { ILogin } from "../types/auth";
import {fetchAPI} from "../utils/fetch";
import { removeLocalStorage } from "../utils/storage";


export const login = async (payload:ILogin ) =>{
    
    const result = await fetchAPI(`${environment.API_URL}auth/login`, {
        method:'POST',
        body: JSON.stringify(payload),
    });
    return result;
}

export const logout = async () => {
     removeLocalStorage("auth");
    return true;
}