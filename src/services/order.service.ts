import { environment } from "../constants/environment"
import type { IOrderParam } from "../types/order"
import { fetchAPI } from "../utils/fetch"
import { getLocalStorage } from "../utils/storage"



export const getOrders = async ({page=1, pageSize = 10, search = '', status } : IOrderParam)=>{
    status = status == "ALL" ? '' : status;
    let url = `${environment.API_URL}orders?page=${page}&pageSize=${pageSize}&search=${search}&status=${status}`

    const token = getLocalStorage('auth');
    
    const result = await fetchAPI(url,{
        method:"GET",
        headers:{
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then((data) => data);

    return result;
}