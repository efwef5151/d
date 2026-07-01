import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";

export const Contact: React.FC = () => {
  const { showAlert } = useApp();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    showAlert("Inquiry submitted successfully! A representative will connect with you.", "success");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 select-none text-left animate-in fade-in duration-300">
      
      {/* Title */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white">
          Contact Support Node
        </h1>
        <p className="text-xs text-slate-400">
          Have query requests regarding corporate listings, partnership models, or resume scanning API credits? We are here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Contact info cards */}
        <div className="md:col-span-5 space-y-4">
          
          <div className="p-5 rounded-2xl bg-white dark:bg-[#0b0c10] border border-slate-200/50 dark:border-slate-800/80 shadow-sm flex items-start gap-4 text-xs font-semibold">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-slate-900 dark:text-white font-bold mb-1">Inquiries Email</h4>
              <p className="text-slate-500 dark:text-slate-400">support@luxora.ai</p>
              <p className="text-slate-500 dark:text-slate-400">partners@luxora.ai</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#0b0c10] border border-slate-200/50 dark:border-slate-800/80 shadow-sm flex items-start gap-4 text-xs font-semibold">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-slate-900 dark:text-white font-bold mb-1">Assistance Hotlines</h4>
              <p className="text-slate-500 dark:text-slate-400">+91 80 4912 8000</p>
              <p className="text-slate-500 dark:text-slate-400">Mon - Fri: 10AM - 6PM IST</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#0b0c10] border border-slate-200/50 dark:border-slate-800/80 shadow-sm flex items-start gap-4 text-xs font-semibold">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-slate-900 dark:text-white font-bold mb-1">Corporate HQ</h4>
              <p className="text-slate-500 dark:text-slate-400">
                12th Floor, Tower B, Prestige Tech Park, Outer Ring Road, Bengaluru, Karnataka, 560103.
              </p>
            </div>
          </div>

        </div>

        {/* Message form */}
        <div className="md:col-span-7 p-6 rounded-3xl bg-white dark:bg-[#0b0c10] border border-slate-200/60 dark:border-slate-800/80 shadow-md">
          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-bold text-slate-600 dark:text-slate-400">
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block mb-1">Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Arjun"
                  required
                  className="w-full p-2.5 bg-slate-50 dark:bg-[#121319] border border-slate-200 dark:border-slate-800 rounded-xl font-medium text-slate-800 dark:text-white"
                />
              </div>
              <div>
                <label className="block mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. arjun@example.com"
                  required
                  className="w-full p-2.5 bg-slate-50 dark:bg-[#121319] border border-slate-200 dark:border-slate-800 rounded-xl font-medium text-slate-800 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1">Detailed Message</label>
              <textarea
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Brief description of your technical query or partnership project..."
                required
                className="w-full p-2.5 bg-slate-50 dark:bg-[#121319] border border-slate-200 dark:border-slate-800 rounded-xl font-medium text-slate-800 dark:text-white resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-indigo-500/10 transition-all"
            >
              Submit Inquiry <Send className="w-3.5 h-3.5" />
            </button>

          </form>
        </div>

      </div>

    </div>
  );
};
