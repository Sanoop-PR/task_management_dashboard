import { TiArrowLeft, TiArrowRight } from "react-icons/ti";

type Props = {
  totalTasks: number; 
  tasksPerPage: number; 
  currentPage: number;  
  setCurrentPage: (currentPage: number) => void;
};

export const PaginationBtn = ({ totalTasks, tasksPerPage, currentPage, setCurrentPage }: Props) => {
  const totalPages = Math.ceil(totalTasks / tasksPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="flex items-center gap-8">
      <button
        disabled={currentPage === 1}
        className="rounded-md border border-slate-300 p-2.5 text-center text-xl transition-all shadow-sm hover:shadow-lg disabled:opacity-50"
        type="button"
        onClick={handlePrevPage}
      >
        <TiArrowLeft />
      </button>

      <p className="text-slate-600">
        Page <strong className="text-slate-800">{currentPage}</strong> of&nbsp;
        <strong className="text-slate-800">{totalPages}</strong>
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
