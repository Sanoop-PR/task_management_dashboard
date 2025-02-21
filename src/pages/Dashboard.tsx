import { useDispatch, useSelector } from "react-redux";
import { AddTask } from "../components/AddTask";
import { ListTask } from "../components/ListTask";
import { AppDispatch, RootState } from "../features/store";
import { fetchTasks } from "../features/slice/tasksSlice";
import { useEffect, useState } from "react";

export const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks } = useSelector((state: RootState) => state.tasks);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("title");

  useEffect(() => {
    tasks.length===0 &&dispatch(fetchTasks());
  }, [dispatch]);

  // Filtering Logic
  let filteredData = tasks
    ?.filter((task) => {
      // Status Filtering
      if (filter === "completed") return task.completed;
      if (filter === "pending") return !task.completed;
      return tasks; // "all" case
    }) || [];

  filteredData = [...filteredData].sort((a, b) => {
    if (sortBy === "title") {
      return a.title.localeCompare(b.title);
    } else if (sortBy === "status") {
      return Number(a.completed) - Number(b.completed);
    }
    return 0;
  });

  return (
    <main className="p-4 space-y-5">
      <AddTask />

      {/* Status Filter Dropdown */}
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="max-w-40 bg-transparent text-slate-700 text-sm border border-slate-200 rounded p-2 cursor-pointer"
      >
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
      </select>

      {/* sort filter */}
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="max-w-40 ml-3 bg-transparent text-slate-700 text-sm border border-slate-200 rounded p-2 cursor-pointer"
      >
        <option value="title">Sort by Title</option>
        <option value="status">Sort by Status</option>
      </select>

      {filteredData.length > 0 ? (
        filteredData.map((task) => <ListTask key={task.id} task={task} />)
      ) : (
        <p>No tasks found</p>
      )}
    </main>
  );
};
