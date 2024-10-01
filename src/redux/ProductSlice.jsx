// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//     products: [],
//     items: [],
//     totalQuantity: 0,
//     totalAmount: 0,
// };

// const ProductSlice = createSlice({
//     name: 'cart',
//     initialState,
//     reducers: {
//         // Function to set products
//         setProducts(state, action) {
//             state.products = action.payload;
//         },
//         // Function to add item to the cart 
//         addItem(state, action) {
//             const newItem = action.payload;
//             state.totalQuantity++;
//             state.items.push({
//                 id: newItem._id,
//                 title: newItem.title,
//                 price: newItem.price,
//                 quantity: 1,
//                 totalPrice: newItem.price,
//                 image: newItem.image, 
//               });
//             state.totalAmount += newItem.price;
//           },
//           // Function to remove item from the cart
//           removeItem(state, action) {
//             const id = action.payload;
//             const existingItem = state.items.find(item => item.id === id);
//             state.totalQuantity -= existingItem.quantity;
//             state.items = state.items.filter(item => item.id !== id);
//             state.totalAmount -= existingItem.price;
//         },
//         // Function to increase the quantity of the item in the cart
//         updateQuantity(state, action) {
//             const { id, quantity } = action.payload;
//             const existingItem = state.items.find(item => item.id === id);
//             const difference = quantity - existingItem.quantity;
//             existingItem.quantity = quantity;
//             existingItem.totalPrice = existingItem.price * quantity;
//             state.totalQuantity += difference;
//             state.totalAmount += difference * existingItem.price;
//         },
//         clearCart: (state) => {
//             state.items = [];
//             state.totalQuantity = 0;
//             state.totalAmount = 0;
//         },
//     }
// });

// export const { setProducts, addItem, removeItem, updateQuantity, clearCart } = ProductSlice.actions;

// export default ProductSlice.reducer;





import { createSlice } from '@reduxjs/toolkit';

// Helper function to load state from localStorage
const loadStateFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('cart');
        if (serializedState === null) {
            return {
                products: [],
                items: [],
                totalQuantity: 0,
                totalAmount: 0,
            };
        }
        return JSON.parse(serializedState);
    } catch (e) {
        console.warn('Error loading state from localStorage', e);
        return {
            products: [],
            items: [],
            totalQuantity: 0,
            totalAmount: 0,
        };
    }
};

// Helper function to save state to localStorage
const saveStateToLocalStorage = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('cart', serializedState);
    } catch (e) {
        console.warn('Error saving state to localStorage', e);
    }
};

// Initial state loaded from localStorage
const initialState = loadStateFromLocalStorage();

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
            const existingItem = state.items.find(item => item.id === newItem._id);

            if (!existingItem) {
                state.totalQuantity++;
                state.items.push({
                    id: newItem._id,
                    title: newItem.title,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    image: newItem.image,
                });
            } else {
                existingItem.quantity++;
                existingItem.totalPrice += newItem.price;
            }
            state.totalAmount += newItem.price;

            // Persist state to localStorage
            saveStateToLocalStorage(state);
        },
        // Function to remove item from the cart
        removeItem(state, action) {
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);

            if (existingItem) {
                state.totalQuantity -= existingItem.quantity;
                state.items = state.items.filter(item => item.id !== id);
                state.totalAmount -= existingItem.totalPrice;
            }

            // Persist state to localStorage
            saveStateToLocalStorage(state);
        },
        // Function to increase the quantity of the item in the cart
        updateQuantity(state, action) {
            const { id, quantity } = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            
            if (existingItem) {
                const difference = quantity - existingItem.quantity;
                existingItem.quantity = quantity;
                existingItem.totalPrice = existingItem.price * quantity;
                state.totalQuantity += difference;
                state.totalAmount += difference * existingItem.price;
            }

            // Persist state to localStorage
            saveStateToLocalStorage(state);
        },
        // Function to clear the cart
        clearCart: (state) => {
            state.items = [];
            state.totalQuantity = 0;
            state.totalAmount = 0;

            // Persist state to localStorage
            saveStateToLocalStorage(state);
        },
    }
});

export const { setProducts, addItem, removeItem, updateQuantity, clearCart } = ProductSlice.actions;

export default ProductSlice.reducer;
