import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import CoursesPage from "./pages/CoursesPage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";

const router = createBrowserRouter([{
  path: "/", element: <App />,   children: [
      {
        index: true,
        element: <CoursesPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
}])

export default router