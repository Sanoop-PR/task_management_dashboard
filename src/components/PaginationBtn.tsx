import { TiArrowLeft, TiArrowRight } from "react-icons/ti";
import { fetchTasks } from "../features/slice/tasksSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../features/store";

type Props = {
  totalTasks: number; 
  tasksPerPage: number; 
  currentPage: number;  
  setCurrentPage: (currentPage: number) => void;
};

export const PaginationBtn = ({ totalTasks, tasksPerPage, currentPage, setCurrentPage }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const totalPages = Math.ceil(totalTasks / tasksPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      dispatch(fetchTasks({ page: currentPage, limit: tasksPerPage }));
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      dispatch(fetchTasks({ page: currentPage, limit: tasksPerPage }));
    }
  };

  return (
    <div className="flex items-center gap-8 w-fit mx-auto">
      <button
        disabled={currentPage === 1}
        className="rounded-md border border-slate-300 p-2.5 text-center text-xl transition-all shadow-sm hover:shadow-lg disabled:opacity-50"
        type="button"
        onClick={handlePrevPage}
      >
        <TiArrowLeft />
      </button>

      <p className="text-slate-600 dark:text-white">
        Page <strong className="text-slate-800 dark:text-gray-500">{currentPage}</strong> of&nbsp;
        <strong className="text-slate-800 dark:text-gray-500">{totalPages}</strong>
      </p>

      <button
        disabled={currentPage === totalPages}
        className="rounded-md border border-slate-300 p-2.5 text-center text-xl transition-all shadow-sm hover:shadow-lg disabled:opacity-50"
        type="button"
        onClick={handleNextPage}
      >
        <TiArrowRight />
      </button>
    </div>
  );
};
