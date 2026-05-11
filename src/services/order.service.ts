import { environment } from "../constants/environment"
import type { IOrderDetailResponse, IOrderParam, IOrderRequest, IOrderResponse } from "../types/order"
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
    }).then((data: IOrderResponse) => {
        return data;
    });


    return result;
}

export const getOrderById = async (id:string) => {
    const token = getLocalStorage('auth');
    const url = `${environment.API_URL}orders/${id}`;
    const result = await fetchAPI(url,{
        method:"GET",
        headers:{
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then((data : IOrderDetailResponse) => {
        
        return data;
    });
    console.log("result",result);

    return result;
}

export const deleteOrderById = async (id:string) => {
    const token = getLocalStorage('auth');
    const url = `${environment.API_URL}orders/${id}`;
    const result = await fetchAPI(url,{
        method:"DELETE",
        headers:{
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return result;
}

export const updateOrderStatus = async (id:string, status: string) => {
    const token = getLocalStorage('auth');
    const url = `${environment.API_URL}orders/${id}`;

    const result = await fetchAPI(url,{
        method:"PUT",
        headers:{
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({status})
    });
    return result;
}
export const createOrder = async (payload: IOrderRequest ) => {
    const token = getLocalStorage('auth');
    const url = `${environment.API_URL}orders`;

    const result = await fetchAPI(url,{
        method:"POST",
        headers:{
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
    });
    return result;
}