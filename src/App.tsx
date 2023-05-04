import { Route, Routes } from "react-router-dom";
import { Anchor } from "./shared/Anchor";
import { Menu } from "./Menu";
import { Admin } from "./Admin";
import { ErrorBoundary } from "react-error-boundary";
import { User, UserContextProvider } from "./context/UserContext";
import { useState } from "react";

export function App() {
  const [user, setUser] = useState<User | null>(null);
  return (
    <UserContextProvider user={user} setUser={setUser}>
      <header className="flex justify-center bg-white py-2">
        <div className="w-1/12">
          <Anchor href="/">Menu</Anchor>
        </div>
        <div className="w-1/12">
          <Anchor href="/admin">Admin</Anchor>
        </div>
        {!user && (
          <div
            className="w=1/12"
            onClick={() => setUser({ id: 1, name: "Doug" })}
          >
            <Anchor href="">Login</Anchor>
          </div>
        )}
        {user && (
          <div className="w=1/12" onClick={() => setUser(null)}>
            <Anchor href="">Logout</Anchor>
          </div>
        )}
      </header>
      <main>
        <ErrorBoundary fallback={<h1>Oops 2!</h1>}>
          <Routes>
            <Route path="/" element={<Menu />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<h1>Page not found</h1>} />
          </Routes>
        </ErrorBoundary>
      </main>
    </UserContextProvider>
  );
}
