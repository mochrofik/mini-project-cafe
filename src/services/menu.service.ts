import { environment } from "../constants/environment";
import type { IMenuResponse } from "../types/menu";
import { fetchAPI } from "../utils/fetch";

export const getMenu = async ({pageSize = 10}) => {
    const result = await fetchAPI(`${environment.API_URL}menu?pageSize=${pageSize}`, {
        method:'GET',
    });
    return result as IMenuResponse;
}