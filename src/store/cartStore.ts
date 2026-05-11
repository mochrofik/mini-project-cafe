import {create} from 'zustand'
import type {  ICartRequest } from '../types/order'

interface CartState {
    cart: ICartRequest[];
    addToCart: (item: ICartRequest) => void;
    removeFromCart: (id:string) =>void;
    decreaseQty: (id:string) =>void;
    getTotalPrice: () => number;
    clearCart: ()=> void;

}

const useCartStore = create<CartState>()((set, get) => ({
    cart:[],

    addToCart : (menu) => set((state) => {
        const isExist = state.cart.find((item) => item.menuItemId == menu.menuItemId);
        
        if(isExist){
            //jika barang sudah ada tambah qty aja
            return {
                cart: state.cart.map((item) => item.menuItemId == menu.menuItemId ? {...item,quantity:item.quantity+1} : item)
            };
        }
        //klo barang baru tambahkan menunya
        return {
            cart: [...state.cart, {...menu, quantity:1}]
        };
    
    }),
    decreaseQty: (id) => set((state) => {
     const isExist = state.cart.find((item) => item.menuItemId === id);

     if(isExist && isExist.quantity <= 1){
        return {
            cart: state.cart.filter((item) => item.menuItemId != id)
        }
    }else{
         return {
             cart: state.cart.map((item) => item.menuItemId === id ? {...item, quantity: item.quantity-1 } : item)
         }
     }
     
    }),
    removeFromCart : (id) => set((state) => ({
        cart: state.cart.filter((item) => item.menuItemId != id)
    })) ,

    getTotalPrice: () => {
    return  get().cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  },
  clearCart: () => set({cart:[]})
        

}))

export default useCartStore;