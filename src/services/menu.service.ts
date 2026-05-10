import { environment } from "../constants/environment";
import type { IMenuResponse } from "../types/menu";
import { fetchAPI } from "../utils/fetch";

export const getMenu = async (page?:number, pageSize?:number,  category?:string) => {

    let url = `${environment.API_URL}menu?`;
    if(category){
        url += `&category=${category}`;
    }
    if(page){
        url += `&page=${page}`;
    }
    if(pageSize){
        url += `&pageSize=${pageSize}`;
    }else{
        url += `&pageSize=10`;
    }
    const result = await fetchAPI(url, {
        method:'GET',
    });
    return result as IMenuResponse;
}