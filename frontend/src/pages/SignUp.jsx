import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_PATHS } from "../utils/apiPaths";
import axios from "../utils/axiosInstance";
import { useTheme } from "../context/ThemeContext";

const SignUp = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const handleSignup = async () => {
    try {
      setLoading(true);
      await axios.post(API_PATHS.AUTH.SIGNUP, form);
      navigate("/login");
    } catch (error) {
      console.log(error.response);
      alert("Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 overflow-hidden relative transition-colors duration-300 ${
      isDark ? "bg-[#0a0e1a]" : "bg-slate-50"
    }`}>
      {isDark && (
        <>
          <div className="absolute w-96 h-96 bg-violet-700 rounded-full blur-3xl opacity-20 -top-20 -right-20 pointer-events-none"></div>
          <div className="absolute w-72 h-72 bg-blue-600 rounded-full blur-3xl opacity-20 bottom-10 left-10 pointer-events-none"></div>
        </>
      )}

      <div className={`relative z-10 w-full max-w-md p-8 sm:p-10 rounded-3xl border shadow-2xl transition-all duration-300 ${
        isDark
          ? "bg-white/5 backdrop-blur-2xl border-white/10"
          : "bg-white border-slate-200 shadow-slate-200"
      }`}>
        <div className="text-center mb-8">
          <div className="inline-block text-4xl mb-3">🚀</div>
          <h2 className={`text-3xl font-extrabold ${isDark ? "text-white" : "text-slate-900"}`}>Create Account</h2>
          <p className={`mt-2 text-sm ${isDark ? "text-white/40" : "text-slate-500"}`}>Start your AI-powered interview preparation</p>
        </div>

        <div className="space-y-4">
          {[
            { type: "text", placeholder: "Full name", field: "name" },
            { type: "email", placeholder: "Email address", field: "email" },
            { type: "password", placeholder: "Create a password", field: "password" },
          ].map(({ type, placeholder, field }) => (
            <input
              key={field}
              type={type}
              placeholder={placeholder}
              className={`w-full rounded-2xl p-4 transition-all focus:outline-none focus:ring-2 ${
                isDark
                  ? "bg-white/10 border border-white/10 text-white placeholder-white/30 focus:border-violet-500 focus:ring-violet-500/30"
                  : "bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:border-violet-400 focus:ring-violet-400/30"
              }`}
              onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            />
          ))}

          <button
            onClick={handleSignup}
            disabled={loading}
            className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold py-4 rounded-2xl hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] hover:scale-[1.02] transition-all duration-300 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
                Creating Account...
              </span>
            ) : "Sign Up →"}
          </button>
        </div>

        <div className="flex items-center my-6">
          <div className={`flex-1 h-px ${isDark ? "bg-white/10" : "bg-slate-200"}`}></div>
          <p className={`px-4 text-sm ${isDark ? "text-white/30" : "text-slate-400"}`}>OR</p>
          <div className={`flex-1 h-px ${isDark ? "bg-white/10" : "bg-slate-200"}`}></div>
        </div>

        <p className={`text-center text-sm ${isDark ? "text-white/40" : "text-slate-500"}`}>
          Already have an account?{" "}
          <Link to="/login" className="text-violet-400 font-semibold hover:text-violet-300 transition-colors">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;