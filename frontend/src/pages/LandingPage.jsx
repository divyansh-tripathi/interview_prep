import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { DottedSurface } from "../components/ui/dotted-surface";
import { Bot, Target, Zap } from "lucide-react";

const FloatingOrb = ({ className }) => (
  <div className={`absolute rounded-full blur-3xl opacity-25 animate-pulse pointer-events-none ${className}`}></div>
);

const LandingPage = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className={`  relative min-h-screen flex flex-col justify-center items-center text-center px-4 p-5 overflow-hidden transition-colors duration-300 ${isDark ? "bg-[#0a0e1a] text-white" : "bg-slate-50 text-slate-900"
      }`}>
      <DottedSurface className="absolute inset-0 size-full z-0" />
      {isDark && (
        <>
          <FloatingOrb className="w-96 h-96 bg-blue-600 -top-20 -left-20" />
          <FloatingOrb className="w-72 h-72 bg-indigo-500 bottom-10 right-10" style={{ animationDelay: "1s" }} />
          <FloatingOrb className="w-48 h-48 bg-violet-600 top-1/2 left-1/3" style={{ animationDelay: "2s" }} />
        </>
      )}

      <div className="relative z-10 max-w-3xl w-full">
        <div className={`inline-flex items-center gap-2 text-sm px-4 py-2 rounded-full mb-8 border ${isDark ? "bg-white/10 backdrop-blur-md border-white/10 text-white/70" : "bg-blue-50 border-blue-200 text-blue-600"
          }`}>
          <span className="w-2 h-2 rounded-full bg-green-400 animate-ping inline-block"></span>
          AI-Powered Interview Preparation
        </div>

        <h1 className={`text-5xl sm:text-6xl md:text-7xl font-black leading-tight mb-6 ${isDark ? "text-white" : "text-slate-900"}`}>
          Ace Interviews with{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-violet-500 to-indigo-500">
            AI-Powered
          </span>{" "}
          Learning
        </h1>

        <p className={`text-base sm:text-lg max-w-xl mx-auto mb-10 ${isDark ? "text-white/50" : "text-slate-500"}`}>
          Generate role-specific questions, expand answers, and master concepts with AI assistance.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/login")}
            className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold px-10 py-4 rounded-2xl hover:scale-105 hover:shadow-[0_0_40px_rgba(99,102,241,0.5)] transition-all duration-300 active:scale-95"
          >
            Get Started →
          </button>
          <button
            onClick={() => navigate("/signup")}
            className={`font-semibold px-10 py-4 rounded-2xl border transition-all duration-300 hover:scale-105 ${isDark ? "bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20" : "bg-white text-slate-800 border-slate-300 hover:bg-slate-50"
              }`}
          >
            Create Account
          </button>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
          <div className={`flex flex-col items-center justify-center gap-2 rounded-2xl py-6 px-4 text-sm backdrop-blur-sm transition-transform hover:scale-105 ${isDark ? "bg-white/5 border border-white/10 text-white/70" : "bg-white/50 border border-slate-200 text-slate-700"
            }`}>
            <Bot className="w-8 h-8 text-blue-500 mb-2" />
            <span className="font-medium">AI Generated</span>
          </div>
          <div className={`flex flex-col items-center justify-center gap-2 rounded-2xl py-6 px-4 text-sm backdrop-blur-sm transition-transform hover:scale-105 ${isDark ? "bg-white/5 border border-white/10 text-white/70" : "bg-white/50 border border-slate-200 text-slate-700"
            }`}>
            <Target className="w-8 h-8 text-indigo-500 mb-2" />
            <span className="font-medium">Role Specific</span>
          </div>
          <div className={`flex flex-col items-center justify-center gap-2 rounded-2xl py-6 px-4 text-sm backdrop-blur-sm transition-transform hover:scale-105 ${isDark ? "bg-white/5 border border-white/10 text-white/70" : "bg-white/50 border border-slate-200 text-slate-700"
            }`}>
            <Zap className="w-8 h-8 text-violet-500 mb-2" />
            <span className="font-medium">Instant</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;