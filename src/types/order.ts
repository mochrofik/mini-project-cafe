import type { IMetaData } from "./metadata";

interface IOrderParam{
    page:number,
    pageSize:number
    search: string,
    status?: string
}

interface ICart {
    menuItemId: string,
    quantity:number,
    notes: string,
}

interface IOrder {
    id:string,
    customer_name: string,
    table_number: 5,
    cart: ICart[],
    status: "PENDING"|"PROCESSING"|"COMPLETED",
    total: number,
    created_at: string,
    updated_at:string,
}

interface IOrderResponse {
    data: IOrder[],
    metadata:IMetaData,
}


interface IOrderDetailResponse {
    id:string,
    customer_name: string,
    status: "PENDING"|"PROCESSING"|"COMPLETED",
    table_number: number,
    total: number,
    created_at: string,
    updated_at:string,
    cart: {
        menuItem: {
            id: string,
            name: string,
            image_url: string,
            is_available: boolean,
            price: number,
            description: string,
            category: string,
        },
        quantity: number,
        notes: string,
    }[]
}


export type {IOrderParam, IOrder, ICart, IOrderResponse, IOrderDetailResponse};

