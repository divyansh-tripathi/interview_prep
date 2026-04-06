import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_PATHS } from "../utils/apiPaths";
import axios from "../utils/axiosInstance";
import Navbar from "../components/Navbar";
import { useTheme } from "../context/ThemeContext";

const Dashboard = () => {
  const [sessions, setSessions] = useState([]);
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [creating, setCreating] = useState(false);
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const fetchSessions = async () => {
    try {
      const res = await axios.get(API_PATHS.SESSION.GET_ALL);
      setSessions(res.data.sessions);
    } catch (err) {
      console.log(err.response);
    }
  };

  const createSession = async () => {
    if (!role || !experience) return alert("Fill all fields");
    try {
      setCreating(true);
      await axios.post(API_PATHS.SESSION.CREATE, { role, experience, questions: [] });
      setRole("");
      setExperience("");
      fetchSessions();
    } catch (error) {
      console.log(error.response);
    } finally {
      setCreating(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const inputCls = `rounded-2xl p-4 transition-all focus:outline-none focus:ring-2 ${
    isDark
      ? "bg-white/10 border border-white/10 text-white placeholder-white/30 focus:border-blue-500 focus:ring-blue-500/30"
      : "bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-400 focus:ring-blue-400/30"
  }`;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? "bg-[#0a0e1a] text-white" : "bg-slate-50 text-slate-900"}`}>
      <Navbar />

      {isDark && (
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="w-96 h-96 bg-blue-700 rounded-full blur-3xl opacity-10 absolute -top-20 left-10"></div>
          <div className="w-72 h-72 bg-violet-700 rounded-full blur-3xl opacity-10 absolute top-1/3 right-0"></div>
        </div>
      )}

      <div className="relative z-10 max-w-5xl mx-auto pt-10 sm:pt-12 px-4 pb-20">
        <div className="mb-10">
          <h1 className={`text-3xl sm:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r ${
            isDark ? "from-blue-400 to-indigo-400" : "from-blue-600 to-indigo-600"
          }`}>
            Dashboard
          </h1>
          <p className={`mt-2 ${isDark ? "text-white/40" : "text-slate-500"}`}>Manage your interview preparation sessions</p>
        </div>

        <div className={`p-6 sm:p-8 rounded-3xl border shadow-sm mb-10 transition-all ${
          isDark
            ? "bg-white/5 backdrop-blur-xl border-white/10 shadow-black/30"
            : "bg-white border-slate-200 shadow-slate-100"
        }`}>
          <h2 className={`text-xl font-bold mb-6 ${isDark ? "text-white/80" : "text-slate-800"}`}>✏️ Create New Session</h2>

          <div className="flex flex-col md:flex-row gap-4">
            <input
              placeholder="Role (e.g. Frontend Developer)"
              value={role}
              className={`${inputCls} flex-1`}
              onChange={(e) => setRole(e.target.value)}
            />
            <input
              placeholder="Experience (e.g. 2 years)"
              value={experience}
              className={`${inputCls} w-full md:w-52`}
              onChange={(e) => setExperience(e.target.value)}
            />
            <button
              onClick={createSession}
              disabled={creating}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold px-8 py-4 rounded-2xl hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(99,102,241,0.4)] transition-all duration-300 active:scale-95 disabled:opacity-60 whitespace-nowrap"
            >
              {creating ? "Creating..." : "+ Create"}
            </button>
          </div>
        </div>

        {sessions.length === 0 ? (
          <div className={`text-center py-24 rounded-3xl border border-dashed ${
            isDark ? "bg-white/5 border-white/10 text-white/60" : "bg-slate-100/60 border-slate-300 text-slate-500"
          }`}>
            <span className="text-5xl block mb-4">😕</span>
            <p className="text-xl font-medium">No sessions yet</p>
            <p className={`text-sm mt-2 ${isDark ? "text-white/30" : "text-slate-400"}`}>Create your first session to get started</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {sessions.map((s) => (
              <div
                key={s._id}
                onClick={() => navigate(`/interview/${s._id}`)}
                className={`group relative p-6 rounded-3xl border cursor-pointer transition-all duration-400 overflow-hidden hover:-translate-y-2 ${
                  isDark
                    ? "bg-white/5 backdrop-blur-md border-white/10 hover:border-blue-500/50 hover:bg-white/10 hover:shadow-[0_20px_40px_rgba(99,102,241,0.2)]"
                    : "bg-white border-slate-200 hover:border-blue-400 hover:shadow-[0_10px_30px_rgba(99,102,241,0.12)]"
                }`}
              >
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold text-lg mb-4 shadow-lg bg-gradient-to-br ${
                  isDark ? "from-blue-500 to-indigo-600" : "from-blue-500 to-indigo-500"
                }`}>
                  {s.role?.[0]?.toUpperCase() || "S"}
                </div>
                <h2 className={`font-bold text-lg mb-1 ${isDark ? "text-white/90 group-hover:text-white" : "text-slate-800"}`}>{s.role}</h2>
                <p className={`text-sm ${isDark ? "text-white/40" : "text-slate-500"}`}>{s.experience} experience</p>
                <div className={`mt-5 text-xs font-medium transition-colors ${
                  isDark ? "text-blue-400/70 group-hover:text-blue-400" : "text-blue-500"
                }`}>
                  Start Session →
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;