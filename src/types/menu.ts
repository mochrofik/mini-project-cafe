interface IMenuResponse{
    data: IMenuItem[],
    metadata: {
        page: number,
        pageSize: number,
        total: number,
        totalPages: number,
    }
}

interface IMenuItem {

    
    id: string,
    name: string,
    image_url: string,
    is_available: boolean,
    price: number,
    description: string,
    category: string,
}

export type { IMenuResponse, IMenuItem };