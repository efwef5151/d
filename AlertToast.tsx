import React from "react";
import { useApp } from "../context/AppContext";
import { CheckCircle, AlertCircle, Info, X } from "lucide-react";

export const AlertToast: React.FC = () => {
  const { alerts } = useApp();

  if (alerts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-xl backdrop-blur-md transition-all duration-300 transform translate-y-0 animate-in fade-in slide-in-from-bottom-5 ${
            alert.type === "success"
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
              : alert.type === "error"
                ? "bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400"
                : "bg-indigo-500/10 border-indigo-500/30 text-indigo-600 dark:text-indigo-400"
          }`}
        >
          {alert.type === "success" && <CheckCircle className="w-5 h-5 shrink-0" />}
          {alert.type === "error" && <AlertCircle className="w-5 h-5 shrink-0" />}
          {alert.type === "info" && <Info className="w-5 h-5 shrink-0" />}

          <div className="flex-1 text-xs font-semibold leading-relaxed text-slate-800 dark:text-slate-100 text-left">
            {alert.text}
          </div>
        </div>
      ))}
    </div>
  );
};
