import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import QAItem from "../components/QAItems";
import Navbar from "../components/Navbar";
import { useTheme } from "../context/ThemeContext";
import { ShiningText } from "../components/ui/shining-text";

const InterviewPrep = () => {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const fetchQuestions = async () => {
    const res = await axios.get(`${API_PATHS.SESSION.GET_ONE}/${id}`);
    setQuestions(res.data.session?.questions || []);
  };

  const generateQuestions = async () => {
    try {
      setIsLoading(true);
      await axios.post(API_PATHS.AI.GENERATE_QUESTIONS, { sessionId: id });
      await fetchQuestions();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? "bg-[#0a0e1a] text-white" : "bg-slate-50 text-slate-900"}`}>
      <Navbar />

      {isDark && (
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="w-96 h-96 bg-blue-700 rounded-full blur-3xl opacity-10 absolute -top-20 -left-20"></div>
          <div className="w-72 h-72 bg-indigo-700 rounded-full blur-3xl opacity-10 absolute bottom-10 right-10"></div>
        </div>
      )}

      <div className="relative z-10 max-w-4xl mx-auto pt-10 sm:pt-12 px-4 pb-20">
        <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 p-6 sm:p-8 rounded-3xl border shadow-sm gap-4 transition-all duration-300 ${isDark
            ? "bg-white/5 backdrop-blur-xl border-white/10 shadow-black/30"
            : "bg-white border-slate-200 shadow-slate-100"
          }`}>
          <div>
            <h1 className={`text-3xl sm:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r ${isDark ? "from-blue-400 to-indigo-400" : "from-blue-600 to-indigo-600"
              }`}>
              Interview Questions
            </h1>
            <p className={`mt-1 text-sm ${isDark ? "text-white/30" : "text-slate-500"}`}>Click a question to reveal the answer</p>
          </div>

          <button
            onClick={generateQuestions}
            disabled={isLoading}
            className={`relative overflow-hidden px-6 sm:px-8 py-3.5 rounded-2xl text-white font-bold transition-all duration-300 whitespace-nowrap w-full sm:w-auto text-center ${isLoading
                ? "bg-slate-600 cursor-not-allowed opacity-60"
                : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-[1.04] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] active:scale-95"
              }`}
          >
            <span className="relative flex items-center justify-center gap-2">
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                  </svg>
                  Generating...
                </>
              ) : "✨ Generate New"}
            </span>
          </button>
        </div>

        {isLoading ? (
          <div className="space-y-5">
            <div className="flex justify-center items-center py-4">
              <ShiningText text="HextaAI is thinking..." />
            </div>
            <div className="space-y-5 animate-pulse">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={`rounded-3xl p-7 flex flex-col gap-4 border ${isDark ? "bg-white/5 border-white/10" : "bg-white border-slate-200"
                  }`}>
                  <div className={`h-6 rounded-xl w-3/4 ${isDark ? "bg-white/10" : "bg-slate-200"}`}></div>
                  <div className={`h-4 rounded-xl w-1/2 ${isDark ? "bg-white/5" : "bg-slate-100"}`}></div>
                </div>
              ))}
            </div>
          </div>
        ) : questions.length === 0 ? (
          <div className={`text-center py-24 rounded-3xl border border-dashed ${isDark ? "bg-white/5 border-white/10" : "bg-slate-100/60 border-slate-300"
            }`}>
            <span className="text-5xl block mb-4">🚀</span>
            <p className={`text-xl font-medium ${isDark ? "text-white/60" : "text-slate-600"}`}>No questions generated yet.</p>
            <p className={`mt-2 text-sm ${isDark ? "text-white/30" : "text-slate-400"}`}>Click generate to start your preparation.</p>
          </div>
        ) : (
          <div className="space-y-5">
            {questions.map((q) => (
              <QAItem key={q._id} item={q} isDark={isDark} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewPrep;