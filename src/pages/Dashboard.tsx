import { AddTask } from "../components/AddTask"
import {ListTask} from "../components/ListTask"

export const Dashboard = () => {
  return (
    <main className="p-4 space-y-5">
      <AddTask />
      <section className="flex gap-5">
        <div className=" max-w-40">
          <div className="relative">
            <select
              className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none shadow-sm focus:shadow-md appearance-none cursor-pointer">
              <option value="brazil">Brazil</option>
              <option value="bucharest">Bucharest</option>
              <option value="london">London</option>
              <option value="washington">Washington</option>
            </select>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.2" stroke="currentColor" className="h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-slate-700">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
            </svg>
          </div>
        </div>
        <div className=" max-w-40">
          <div className="relative">
            <select
              className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none shadow-sm focus:shadow-md appearance-none cursor-pointer">
              <option value="brazil">Brazil</option>
              <option value="bucharest">Bucharest</option>
              <option value="london">London</option>
              <option value="washington">Washington</option>
            </select>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.2" stroke="currentColor" className="h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-slate-700">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
            </svg>
          </div>
        </div>
      </section>
      <ListTask/>
    </main>
  )
}
