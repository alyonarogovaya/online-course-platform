import { FiLogOut } from "react-icons/fi";
import { logout } from "../../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";

function Header() {
   const user = useAppSelector((state) => state.auth.user);
   const dispatch = useAppDispatch();
   const navigate = useNavigate();

   return (
      <header className="flex p-4 items-center justify-between border-b-1 border-gray-300">
         <Link to="/" className="text-blue-500 text-2xl font-bold">React Courses</Link>
         {user ? <button
            onClick={() => dispatch(logout())}
            className="text-white p-2 rounded cursor-pointer hover:bg-gray-200"
         >
            <FiLogOut className="stroke-blue-500" />
         </button> : 
         <Button onClick={() => navigate("/login")}>Login</Button>
         }
      </header>)
}

export default Header