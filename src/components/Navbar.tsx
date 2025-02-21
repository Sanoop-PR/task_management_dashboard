import { useDispatch } from "react-redux"
import { logout } from "../features/slice/authSlice"
import { AppDispatch } from "../features/store"
import ThemeToggle from "./ThemeToggle"
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router";

export const Navbar = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    const hnadleLogout = () => {
        dispatch(logout())
        localStorage.removeItem('root')
    }

    // navigate previous page
    const handleBack =()=>{
        navigate(-1)
    }


    return (
        <nav className="block w-full max-w-screen-lg px-4 py-2 mx-auto text-white bg-gray-200 dark:bg-gray-800  lg:px-8 lg:py-3">
            <div className="container flex text-gray-100">
                <button onClick={handleBack} className="flex-1">
                    <IoIosArrowBack />
                </button>
                <ThemeToggle />
                <button onClick={hnadleLogout} className="rounded-md border border-slate-300 py-2 px-4 text-center text-sm text-black dark:text-white cursor-pointer" type="button">
                    logout
                </button>
            </div>
        </nav>
    )
}
