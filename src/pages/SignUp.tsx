import { Link, useNavigate } from "react-router";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { AuthForm } from "../types";
import { AppDispatch, RootState } from "../features/store";
import { register } from "../features/slice/authSlice";

const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
}).required();

export const SignUp = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { isLoading, error } = useSelector((state: RootState) => state.auth);

  const { register: registerForm, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: AuthForm) => {
    dispatch(register(data)).unwrap().then(() => (
      navigate('/')
    ))
  };
  // console.log(user, isLoading, error)

  return (
    <main className="grid place-items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md space-y-3">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>
        <div className="w-full max-w-sm min-w-[200px]">
          <label className="block mb-2 text-sm text-slate-600">Email</label>
          <input
            {...registerForm('email')}
            type="email"
            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            placeholder="enter your email"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>
        <div className="w-full max-w-sm min-w-[200px]">
          <label className="block mb-2 text-sm text-slate-600">Password</label>
          <input
            {...registerForm('password')}
            type="password"
            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            placeholder="Enter your passoword"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full rounded-md bg-green-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-green-700 focus:shadow-none active:bg-green-700 hover:bg-green-700 active:shadow-none disabled:opacity-50 disabled:shadow-none"
          disabled={isLoading}
        >
          {
            isLoading ? "loading" : "Sign Up"
          }
        </button>
        {
          error && <p className="text-red-400">{error}</p>
        }
        <p className="flex justify-center mt-6 text-sm text-slate-600">
          Already have an account?
          <Link to={'/sign-in'} className="ml-1 text-sm font-semibold text-slate-700 underline">
            Sign up
          </Link>
        </p>
      </form>
    </main>
  )
}
