import { Link } from "react-router"

export const SignIn = () => {
  return (
    <main className="grid place-items-center h-screen bg-gray-100">
      <section className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md space-y-3">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign In</h2>
        <div className="w-full max-w-sm min-w-[200px]">
          <label className="block mb-2 text-sm text-slate-600">Email</label>
          <input
            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            placeholder="enter your email"
          />
        </div>
        <div className="w-full max-w-sm min-w-[200px]">
          <label className="block mb-2 text-sm text-slate-600">Password</label>
          <input
            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            placeholder="Enter your passoword"
          />
        </div>
        <button
          className="w-full rounded-md bg-green-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-green-700 focus:shadow-none active:bg-green-700 hover:bg-green-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button">
          Sign In
        </button>
        <p className="flex justify-center mt-6 text-sm text-slate-600">
          Don&apos;t have an account?
          <Link to={'/sign-up'} className="ml-1 text-sm font-semibold text-slate-700 underline">
            Sign up
          </Link>
        </p>
      </section>
    </main>
  )
}
