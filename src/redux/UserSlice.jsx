// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//     isLoggedIn: false,
//     user: null,
// };

// const UserSlice = createSlice({
//     name: 'user',
//     initialState,
//     reducers: {
//         login(state, action) {
//             state.isLoggedIn = true;
//             state.user = action.payload;
//         },
//         logout(state) {
//             state.isLoggedIn = false;
//             state.user = null;
//             localStorage.removeItem('user'); // Remove user from localStorage
//         },
//         updateUser(state, action) {
//             state.user = action.payload;
//             localStorage.setItem('user', JSON.stringify(action.payload)); // Update user in localStorage
//         },
//     },
// });

// export const { login, logout, updateUser } = UserSlice.actions;
// export default UserSlice.reducer;




import { createSlice } from '@reduxjs/toolkit';

// Helper function to load user from localStorage
const loadUserFromLocalStorage = () => {
    try {
        const serializedUser = localStorage.getItem('user');
        if (serializedUser === null) {
            return {
                isLoggedIn: false,
                user: null,
            };
        }
        return {
            isLoggedIn: true,
            user: JSON.parse(serializedUser),
        };
    } catch (e) {
        console.warn('Error loading user from localStorage', e);
        return {
            isLoggedIn: false,
            user: null,
        };
    }
};

// Initial state loaded from localStorage
const initialState = loadUserFromLocalStorage();

const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // Function to handle user login
        login(state, action) {
            state.isLoggedIn = true;
            state.user = action.payload;
            // Persist user in localStorage
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        // Function to handle user logout
        logout(state) {
            state.isLoggedIn = false;
            state.user = null;
            // Remove user from localStorage
            localStorage.removeItem('user');
            //Remove token from localStorage
            localStorage.removeItem('token');
        },
        // Function to handle user update
        updateUser(state, action) {
            state.user = action.payload;
            // Update user in localStorage
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
    },
});

export const { login, logout, updateUser } = UserSlice.actions;

export default UserSlice.reducer;
