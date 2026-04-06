import { useState } from "react";
import ReactMarkdown from "react-markdown";

const QAItem = ({ item, onPin, isDark = true }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={`group relative rounded-3xl border transition-all duration-400 overflow-hidden hover:-translate-y-1.5 ${
      isDark
        ? "bg-white/5 backdrop-blur-xl border-white/10 hover:border-indigo-500/40 hover:shadow-[0_20px_40px_rgba(99,102,241,0.15)]"
        : "bg-white border-slate-200 hover:border-blue-400/50 hover:shadow-[0_10px_30px_rgba(99,102,241,0.1)]"
    }`}>
      {isDark && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      )}

      <div className="relative z-10 p-5 sm:p-8 flex justify-between items-start gap-4">
        <h3
          className={`text-base sm:text-lg font-bold cursor-pointer flex-1 transition-colors duration-200 leading-snug ${
            isDark ? "text-white/80 group-hover:text-white" : "text-slate-800 group-hover:text-blue-700"
          }`}
          onClick={() => setOpen(!open)}
        >
          <span className={`inline-flex items-center justify-center w-8 h-8 rounded-xl border mr-3 font-mono text-sm flex-shrink-0 align-middle ${
            isDark ? "bg-indigo-600/20 border-indigo-500/30 text-indigo-400" : "bg-blue-50 border-blue-200 text-blue-600"
          }`}>
            Q
          </span>
          {item.question}
        </h3>

        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            onClick={() => onPin?.(item._id)}
            className="p-2 rounded-xl hover:bg-white/10 active:scale-90 transition-all text-lg"
          >
            {item.pinned ? "📌" : "📍"}
          </button>
          <button
            onClick={() => setOpen(!open)}
            className={`p-2 rounded-xl transition-all ${
              isDark ? "text-white/40 hover:text-white hover:bg-white/10" : "text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className={`w-5 h-5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
        </div>
      </div>

      <div className={`relative z-10 grid transition-all duration-500 ease-in-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="overflow-hidden">
          <div className={`mx-5 sm:mx-8 mb-6 p-5 sm:p-6 rounded-2xl border ${
            isDark
              ? "bg-[#0d1117]/80 backdrop-blur-sm border-white/5"
              : "bg-slate-50 border-slate-200"
          }`}>
            <div className={`prose max-w-none ${isDark ? "prose-invert" : ""}`}>
              <ReactMarkdown>{item.answer}</ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QAItem;