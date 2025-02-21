import Swal from "sweetalert2";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { Link } from "react-router";
import { Task } from "../types";
import { useDispatch } from "react-redux";
import { deleteTask } from "../features/slice/tasksSlice";
import { AppDispatch } from "../features/store";

type props ={
  task:Task
}

export const ListTask = ({task}:props) => {
  const dispatch = useDispatch<AppDispatch>();
  
  const handleDeleteBtnClick = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteTask(task.id)).unwrap().then(()=>{
          return Swal.fire({
            title: "Deleted!",
            text: "Your task has been deleted.",
            icon: "success",
          });
        })
      }
    });
  };

  return (
    <div className="text-slate-800 dark:text-gray-200 flex w-full items-center rounded-md p-2 pl-3 transition-all hover:bg-slate-100 dark:hover:bg-gray-800 border">
      <p className="flex-1 outline-none">
        {task.title}
      </p>
      <div className="ml-auto flex flex-col sm:flex-row place-items-center justify-self-end gap-3">
        <Link to={`/edit/${task.id}`}
          className="text-2xl text-blue-500 cursor-pointer">
          <CiEdit />
        </Link>
        <button
          onClick={handleDeleteBtnClick}
          type="button"
          className="text-2xl text-red-500 cursor-pointer">
          <MdOutlineDeleteOutline />
        </button>
      </div>
    </div>
  );
}
