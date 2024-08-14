import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: [],
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
};

const ProductSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // Function to set products
        setProducts(state, action) {
            state.products = action.payload;
        },
        // Function to add item to the cart 
        addItem(state, action) {
            const newItem = action.payload;
            state.totalQuantity++;
            state.items.push({
                id: newItem.id,
                title: newItem.title,
                price: newItem.price,
                quantity: 1,
                totalPrice: newItem.price,
                image: newItem.image, 
              });
            state.totalAmount += newItem.price;
          },
          // Function to remove item from the cart
          removeItem(state, action) {
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            state.totalQuantity -= existingItem.quantity;
            state.items = state.items.filter(item => item.id !== id);
            state.totalAmount -= existingItem.price;
        },
        // Function to increase the quantity of the item in the cart
        updateQuantity(state, action) {
            const { id, quantity } = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            const difference = quantity - existingItem.quantity;
            existingItem.quantity = quantity;
            existingItem.totalPrice = existingItem.price * quantity;
            state.totalQuantity += difference;
            state.totalAmount += difference * existingItem.price;
        },
        clearCart: (state) => {
            state.items = [];
            state.totalQuantity = 0;
            state.totalAmount = 0;
        },
    }
});

export const { setProducts, addItem, removeItem, updateQuantity, clearCart } = ProductSlice.actions;

export default ProductSlice.reducer;
