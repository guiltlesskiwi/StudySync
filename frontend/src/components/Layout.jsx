import Sidebar from "./Sidebar";
import "../styles/layout.css";

export default function Layout({ children }) {
  return (
    <div className="layout">
      <Sidebar />

      <main className="main-content">
        {children}
      </main>
    </div>
  );
}