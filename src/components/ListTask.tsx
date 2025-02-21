import Swal from "sweetalert2";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { Link } from "react-router";

export const ListTask = ({task}) => {
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
        return Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="text-slate-800 flex w-full items-center rounded-md p-2 pl-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 border">
      <label className="flex items-center cursor-pointer relative mr-2">
        <input type="checkbox" defaultChecked={task.completed} className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-green-600 checked:border-green-600" id="check4" />
        <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <TiTick />
        </span>
      </label>
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
