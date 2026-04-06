import { useState } from "react";
import axios from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useTheme } from "../context/ThemeContext";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const handleLogin = async () => {
    const email = form.email.trim();
    const password = form.password.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return toast.error("Please enter a valid email address");
    if (!password) return toast.error("Password cannot be empty");

    try {
      setLoading(true);
      const res = await axios.post(API_PATHS.AUTH.LOGIN, { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userName", res.data.name);
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 overflow-hidden relative transition-colors duration-300 ${isDark ? "bg-[#0a0e1a]" : "bg-slate-50"
      }`}>
      {isDark && (
        <>
          <div className="absolute w-96 h-96 bg-blue-700 rounded-full blur-3xl opacity-20 -top-20 -left-20 pointer-events-none"></div>
          <div className="absolute w-72 h-72 bg-indigo-600 rounded-full blur-3xl opacity-20 bottom-10 right-10 pointer-events-none"></div>
        </>
      )}

      <div className={`relative z-10 w-full max-w-md p-8 sm:p-10 rounded-3xl border shadow-2xl transition-all duration-300 ${isDark
        ? "bg-white/5 backdrop-blur-2xl border-white/10"
        : "bg-white border-slate-200 shadow-slate-200"
        }`}>
        <div className="text-center mb-8">
          <div className="inline-block text-4xl mb-3">👋</div>
          <h2 className={`text-3xl font-extrabold ${isDark ? "text-white" : "text-slate-900"}`}>Welcome Back</h2>
          <p className={`mt-2 text-sm ${isDark ? "text-white/40" : "text-slate-500"}`}>Login to continue your interview preparation</p>
        </div>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            className={`w-full rounded-2xl p-4 transition-all focus:outline-none focus:ring-2 ${isDark
              ? "bg-white/10 border border-white/10 text-white placeholder-white/30 focus:border-blue-500 focus:ring-blue-500/30"
              : "bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-400 focus:ring-blue-400/30"
              }`}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            className={`w-full rounded-2xl p-4 transition-all focus:outline-none focus:ring-2 ${isDark
              ? "bg-white/10 border border-white/10 text-white placeholder-white/30 focus:border-blue-500 focus:ring-blue-500/30"
              : "bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-400 focus:ring-blue-400/30"
              }`}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-4 rounded-2xl hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] hover:scale-[1.02] transition-all duration-300 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
                Logging in...
              </span>
            ) : "Login →"}
          </button>
        </div>

        <div className="flex items-center my-6">
          <div className={`flex-1 h-px ${isDark ? "bg-white/10" : "bg-slate-200"}`}></div>
          <p className={`px-4 text-sm ${isDark ? "text-white/30" : "text-slate-400"}`}>OR</p>
          <div className={`flex-1 h-px ${isDark ? "bg-white/10" : "bg-slate-200"}`}></div>
        </div>

        <p className={`text-center text-sm ${isDark ? "text-white/40" : "text-slate-500"}`}>
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-400 font-semibold hover:text-blue-300 transition-colors">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;