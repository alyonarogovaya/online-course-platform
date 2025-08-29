import { Outlet } from "react-router-dom";
import Header from "./components/UI/Header";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header/>
      <main className="mx-auto max-w-6xl p-4">
        <Outlet />
      </main>
    </div>
  );
}

export default App
