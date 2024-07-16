import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axiosApi from "./axiosApi.ts";


interface Task {
    id: number;
    title: string;
    completed: boolean;
}

interface TasksState {
    tasks: Task[];
    loading: boolean;
    error: boolean;
}

const initialState: TasksState = {
    tasks: [],
    loading: false,
    error: false,
};

export const FetchTasks = createAsyncThunk<Task[],void>(
    'todoList/fetch',
    async () => {
        const response = await axiosApi.get<Task[]>('/todo-list.json');
        const Tasks = Object.keys(response.data).map(id => ({
            ...response.data[id],
            id,
        }))
        console.log(Tasks)
        return Tasks ?? [];
    }
)

export const addTasks = createAsyncThunk(
    'todoList/add',
    async (text:string) => {
        const response = await axiosApi.post<Task>('/todo-list.json',{text});
        return response.data;
    }
)

export const TodoLustSlice = createSlice<TasksState, {}>({
    name: "todoList",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(FetchTasks.pending, (state) => {
            state.loading = true;
            state.error = false
        });

        builder.addCase(FetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
            state.loading = false
            state.tasks = action.payload;
        });

        builder.addCase(FetchTasks.rejected, (state) => {
            state.loading = false;
            state.error = true;
        });
    }
});


export const TodoListReducer = TodoLustSlice.reducer;