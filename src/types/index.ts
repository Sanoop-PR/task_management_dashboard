export interface User {
  id: number;
  email: string;
  token: string;
}

export interface AuthForm {
  email: string;
  password: string;
}

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  dueDate?: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export interface TasksState {
  tasks: Task[];
  task: Task|null;
  isLoading: boolean;
  error: string | null;
}
export interface TaskState {
  task: Task | null;
  isLoading: boolean;
  error: string | null;
}