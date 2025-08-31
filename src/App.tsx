import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/UI/Header";
import { useAppDispatch } from "./hooks";
import { hydrate } from "./features/auth/authSlice";
import { ToastContainer } from "react-toastify";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      dispatch(hydrate(JSON.parse(user)));
    }
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="mx-auto max-w-6xl p-4 h-full">
        <Outlet />
      </main>
      <ToastContainer position="top-center" 
        autoClose={3000}  
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover />
    </div>
  );
}

export default App
