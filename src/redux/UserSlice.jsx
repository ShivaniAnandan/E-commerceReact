import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
    user: null,
};

const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login(state, action) {
            state.isLoggedIn = true;
            state.user = action.payload;
        },
        logout(state) {
            state.isLoggedIn = false;
            state.user = null;
            localStorage.removeItem('user'); // Remove user from localStorage
        },
        updateUser(state, action) {
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload)); // Update user in localStorage
        },
    },
});

export const { login, logout, updateUser } = UserSlice.actions;
export default UserSlice.reducer;
