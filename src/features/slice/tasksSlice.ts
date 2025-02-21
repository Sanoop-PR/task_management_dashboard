import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Task, TasksState } from '../../types';

const initialState: TasksState = {
  tasks: [],
  task: null,
  todoLength:0,
  isLoading: false,
  error: null,
};

export const fetchTasks = createAsyncThunk<Task[], { page: number, limit: number }>('tasks/fetchTasks', async ({ page, limit }) => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/todos',{
    params: {
      _page: page,
      _limit: limit,
    },
  });
  return response.data;
});

export const allTodos = createAsyncThunk<Task[]>('tasks/allTodos', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
  return response.data;
});

export const getTaskById = createAsyncThunk('tasks/getTaskById', async (id:string) => {
  const response = await axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`);
  return response.data;
});

export const addTask = createAsyncThunk('tasks/addTask', async (task: Partial<Task>) => {
  const response = await axios.post('https://jsonplaceholder.typicode.com/todos', task);
  return response.data;
});

export const updateTask = createAsyncThunk('tasks/updateTask', async (task: Task) => {
  const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${task.id}`, task);
  return response.data;
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (taskId: number) => {
  await axios.delete(`https://jsonplaceholder.typicode.com/todos/${taskId}`);
  return taskId;
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      })
      .addCase(allTodos.fulfilled, (state, action) => {
        state.todoLength = action.payload.length;
      })
      .addCase(getTaskById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTaskById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.task = action.payload;
      })
      .addCase(getTaskById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.map((task) =>
          task.id == action.payload.id ? action.payload : task
        );
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      });
  },
});

export default tasksSlice.reducer;