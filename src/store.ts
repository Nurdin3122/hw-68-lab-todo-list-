import { configureStore } from '@reduxjs/toolkit';
import {TodoListReducer} from "./slice.ts";




export const store = configureStore({
    reducer: {
        todoList: TodoListReducer,
    },

});


export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
