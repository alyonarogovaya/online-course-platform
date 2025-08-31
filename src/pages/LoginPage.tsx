import AuthForm from "../features/auth/AuthForm"
import { useAppSelector } from "../hooks";

function LoginPage() {
  const user = useAppSelector((state) => state.auth.user);

  return <div className="flex items-center justify-center h-[calc(100dvh-65px)]">
      {user ? <h1 className="text-3xl text-blue-500 font-bold">Welcome to React Courses!</h1> : <AuthForm />}
  </div>
}

export default LoginPage