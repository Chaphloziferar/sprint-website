import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, LoginResponse } from '../../../interfaces/authInterfaces';

const initialState: AuthState = {
    status: 'Checking',
    token: '',
    role: 'user',
    errorMessage: ''
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signIn: (state, action: PayloadAction<LoginResponse>) => {
            state.status = 'Authenticated';
            state.token = action.payload.token;
            state.role = action.payload.role;
            state.errorMessage = '';
        },
        logout: (state) => {
            state.status = 'Not-Authenticated';
            state.token = '';
            state.role = 'user';
            state.errorMessage = '';
        },
        addError: (state, action: PayloadAction<string>) => {
            state.status = 'Not-Authenticated';
            state.token = '';
            state.role = 'user';
            state.errorMessage = action.payload;
        },
        removeError: (state) => {
            state.errorMessage = '';
        }
    }
});

export const { signIn, logout, addError, removeError } = authSlice.actions;
export default authSlice.reducer;