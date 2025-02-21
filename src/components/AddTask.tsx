import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../features/store";
import { addTask } from "../features/slice/tasksSlice";
import { useEffect } from "react";
import { getUser } from "../features/slice/authSlice";

// today's local date
const getTodayDate = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
};

const today = getTodayDate();

const taskSchema = yup.object().shape({
  title: yup.string().required("Task title is required"),
  dueDate: yup
    .date()
    .required("Due date is required")
    .min(today, "Due date cannot be in the past"),
});

export const AddTask = () => {
  const dispatch = useDispatch<AppDispatch>()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(taskSchema),
  });

  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])

  const onSubmit = (data: any) => {
    const newTask = {
      title: data.title,
      userId: user?.id,
      completed:false,
      id: Date.now(),
      dueDate: data.dueDate,
    };
    dispatch(addTask(newTask));
    reset();
  };
  // console.log(tasks , error, isLoading)
  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="relative flex sm:flex-row flex-col  items-center gap-2">
        <div className="w-full">
          <input
            {...register("title")}
            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 dark:text-white text-sm border border-slate-200 rounded-md p-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            placeholder="Add task"
          />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
        </div>

        <div className="w-full sm:w-32">
          <input
            {...register("dueDate")}
            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow dark:text-white"
            type="date"
            min={today} // past date hide
          />
          {errors.dueDate && <p className="text-red-500 text-xs mt-1">{errors.dueDate.message}</p>}
        </div>

        <button
          className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none max-sm:w-full"
          type="submit"
        >
          Add
        </button>
      </form>
    </div>
  );
};
