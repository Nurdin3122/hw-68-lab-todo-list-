import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axiosApi from "./axiosApi.ts";
import {RootState} from "./store.ts";

interface Task {
    id: string;
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

export const FetchTasks = createAsyncThunk<Task[]>(
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

export const deleteTask = createAsyncThunk<string, string,{state: RootState}>(
    'todoList/delete',
    async (id: string) => {
        await axiosApi.delete(`/todo-list/${id}.json`);
        return id;
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
        builder.addCase(deleteTask.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteTask.fulfilled, (state,action:PayloadAction<string>) => {
            state.loading = false;
            state.tasks = state.tasks.filter((task) => task.id !== action.payload );
        });
        builder.addCase(addTasks.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(addTasks.fulfilled, (state) => {
            state.loading = false;
        });
    }
});


export const TodoListReducer = TodoLustSlice.reducer;