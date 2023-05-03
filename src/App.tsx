import { Route, Routes } from "react-router-dom";
import { Anchor } from "./shared/Anchor";
import { Menu } from "./Menu";
import { Admin } from "./Admin";

export function App() {
  return (
    <>
      <header className="flex justify-center bg-white py-2">
        <div className="w-1/12">
          <Anchor href="/">Menu</Anchor>
        </div>
        <div className="w-1/12">
          <Anchor href="/admin">Admin</Anchor>
        </div>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
      </main>
    </>
  );
}
