import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Dashboard from "./pages/Dashboard.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import SignUp from "./pages/SignUp.jsx";
import Login from "./pages/Login.jsx";
import InterviewPrep from "./pages/InterviewPrep.jsx";

import { Toaster } from "react-hot-toast";
import CounterLoading from "./components/ui/counter-loader";

const App = () => {
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoad(false);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  if (initialLoad) {
    return <CounterLoading />;
  }

  return (
    <>
      <Toaster position="bottom-right" />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/interview/:id" element={<InterviewPrep />} />
      </Routes>
    </>
  );
};

export default App;
