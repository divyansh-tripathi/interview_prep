import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const userName = localStorage.getItem("userName") || "User";

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/");
  };

  const isDark = theme === "dark";

  return (
    <nav className={`sticky top-0 z-50 flex justify-between items-center px-4 sm:px-6 py-4 backdrop-blur-xl border-b shadow-md transition-colors duration-300 ${isDark
        ? "bg-[#0a0e1a]/90 border-white/10 shadow-black/30"
        : "bg-white/90 border-slate-200 shadow-slate-200/50"
      }`}>
      <h1
        className="text-xl font-extrabold cursor-pointer bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-500"
        onClick={() => navigate("/dashboard")}
      >
        InterviewPrep AI
      </h1>

      <div className="hidden sm:flex gap-3 items-center">
        <span className={`text-sm font-medium px-3 py-1.5 rounded-xl ${
          isDark ? "text-white/50 bg-white/5" : "text-slate-500 bg-slate-100"
        }`}>
          👋 Welcome, <span className={`font-bold ${isDark ? "text-white/80" : "text-slate-800"}`}>{userName}</span>
        </span>
        <button
          onClick={() => navigate("/dashboard")}
          className={`font-medium text-sm px-4 py-2 rounded-xl transition-all ${isDark ? "text-white/60 hover:text-white hover:bg-white/10" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
        >
          Dashboard
        </button>

        <button
          onClick={toggleTheme}
          title="Toggle Theme"
          className={`p-2.5 rounded-xl transition-all text-lg hover:scale-110 active:scale-95 ${isDark ? "bg-white/10 hover:bg-white/20" : "bg-slate-100 hover:bg-slate-200"
            }`}
        >
          {isDark ? "☀️" : "🌙"}
        </button>

        <button
          onClick={logout}
          className="bg-gradient-to-r from-red-500 to-rose-600 text-white text-sm font-semibold px-5 py-2 rounded-xl hover:scale-105 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all duration-200 active:scale-95"
        >
          Logout
        </button>
      </div>

      <div className="flex sm:hidden items-center gap-2">
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-xl transition-all text-lg ${isDark ? "bg-white/10" : "bg-slate-100"
            }`}
        >
          {isDark ? "☀️" : "🌙"}
        </button>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`p-2 rounded-xl transition-all ${isDark ? "text-white/70 hover:bg-white/10" : "text-slate-700 hover:bg-slate-100"
            }`}
        >
          {menuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>
      </div>

      {menuOpen && (
        <div className={`absolute top-full left-0 right-0 z-50 px-4 py-4 flex flex-col gap-2 sm:hidden shadow-lg transition-all ${isDark ? "bg-[#0d1117] border-b border-white/10" : "bg-white border-b border-slate-200"
          }`}>
          <button
            onClick={() => { navigate("/dashboard"); setMenuOpen(false); }}
            className={`text-left font-medium text-sm px-4 py-3 rounded-xl w-full transition-all ${isDark ? "text-white/70 hover:bg-white/10" : "text-slate-700 hover:bg-slate-100"
              }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => { logout(); setMenuOpen(false); }}
            className="bg-gradient-to-r from-red-500 to-rose-600 text-white text-sm font-semibold px-5 py-3 rounded-xl w-full"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;