import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import { getTaskById, updateTask } from "../features/slice/tasksSlice"
import { AppDispatch, RootState } from "../features/store"
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form"
import { Task } from "../types"

const getTodayDate = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today.toISOString().split("T")[0];
};

const today = getTodayDate();

const editSchema = yup.object().shape({
  title: yup.string().required("Task title is required"),
  dueDate: yup
    .date()
    .required("Due date is required")
    .min(today, "Due date cannot be in the past"),
  completed: yup.boolean().required("status is required")
});

export const EditTask = () => {
  const { id } = useParams()
  const dispatch = useDispatch<AppDispatch>()

  const { task, error, isLoading } = useSelector((state: RootState) => state.tasks);
  const { user } = useSelector((state: RootState) => state.auth);

  const {
    register: editForm,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editSchema),
  });

  useEffect(() => {
    if (task) {
      reset({
        title: task?.title, 
        dueDate: task?.dueDate?new Date(task?.dueDate):undefined, 
        completed: task?.completed,
      });
    }
  }, [task, reset]);

  useEffect(() => {
    id && dispatch(getTaskById(id))
  }, [dispatch])

  const onSubmit = (data: { title: string; dueDate: Date; completed: boolean }) => {
    if (!task || !user) return; 
    const updatedTask: Task = {
      title: data.title,
      dueDate: data.dueDate.toISOString(),
      userId: user.id,
      id: task.id,
      completed: data.completed
      };
      console.log(updatedTask)
    dispatch(updateTask(updatedTask))
  };

  // console.log(task)

  return (
    <form onSubmit={handleSubmit(onSubmit)}  className="p-10 space-y-5">
      <textarea {...editForm("title")} className="border-1 w-full p-2" ></textarea>
      {errors.title && (
        <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
      )}
      <section className="grid grid-cols-2 gap-10">
        <div className="">
          <span>Status</span>
          <div className="relative">
            <select
              {...editForm("completed")}
              className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer">
              <option value="true">Completed</option>
              <option value="false">Pending</option>
            </select>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.2" stroke="currentColor" className="h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-slate-700">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
            </svg>
          </div>
          {errors.completed && (
            <p className="mt-1 text-sm text-red-600">{errors.completed.message}</p>
          )}
        </div>
        <div className="">
          <label>Date</label>
          <input
            {...editForm("dueDate")}
            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            type="date"
          min={today}
          />
          {errors.dueDate && <p className="text-red-500 text-xs mt-1">{errors.dueDate.message}</p>}
        </div>
      </section>
      <button type="submit" className="rounded-md w-full bg-green-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-green-700 focus:shadow-none active:bg-green-700 hover:bg-green-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
        Update
      </button>
    </form>
  )
}
