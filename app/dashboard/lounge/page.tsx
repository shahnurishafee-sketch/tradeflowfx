"use client";

import { useState } from "react";
import { FiUsers, FiMessageSquare, FiSend, FiSearch, FiHeart, FiLock, FiUnlock, FiGlobe } from "react-icons/fi";

export default function TradersLoungePage() {
  // SOCIAL FEED SELECTION STATES
  const [selectedChannel, setSelectedTradeLounge] = useState({
    id: 1,
    name: "Umar punjabi",
    members: 615,
    posts: 91,
    avatar: "U",
    bannerColor: "from-blue-400 to-indigo-600"
  });

  const [channelsList] = useState([
    { id: 1, name: "Umar punjabi", members: 615, posts: 91, avatar: "U", bannerColor: "from-blue-400 to-indigo-600" },
    { id: 2, name: "TradeFXBook Global", members: 481, posts: 140, avatar: "T", bannerColor: "from-cyan-500 to-blue-600" },
    { id: 3, name: "XAUUSD Scalpers Core", members: 1205, posts: 342, avatar: "G", bannerColor: "from-amber-400 to-yellow-600" },
    { id: 4, name: "Crypto Momentum Alpha", members: 890, posts: 211, avatar: "C", bannerColor: "from-purple-500 to-pink-600" }
  ]);

  const [chatMessages, setChatMessages] = useState([
    { id: 101, user: "Umar punjabi", meta: "Host", text: "Welcome to the premium analytics channel group. Keep discussions focused around daily structural key levels.", time: "10:14 PM", likes: 14 },
    { id: 102, user: "Mohammadshafee Wasta", meta: "Pro", text: "Gold setup looking solid right on the NY session expansion blocks. Appreciate the daily insight updates!", time: "10:30 PM", likes: 4 },
  ]);

  const [typedMessage, setTypedMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleDispatchMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedMessage.trim()) return;

    setChatMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        user: "Mohammadshafee Wasta",
        meta: "Enterprise Account",
        text: typedMessage,
        time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }),
        likes: 0
      }
    ]);
    setTypedMessage("");
  };

  const filteredChannels = channelsList.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-4 text-slate-900 dark:text-slate-100 min-h-[82vh]">
      
      {/* HEADER STRIP */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-gray-100 dark:border-gray-800 pb-3">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">Lounges</h1>
          <p className="text-xs text-gray-400 mt-0.5">Sat, Sep 5 • Connect with elite global network communities</p>
        </div>
        
        {/* Unlocked status confirmation badge row */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-50/50 dark:bg-green-950/10 border border-green-200 dark:border-green-900/40 text-green-800 dark:text-green-400 text-xs font-bold shadow-xs">
          <FiUnlock className="text-green-500 shrink-0" />
          <span>Full Access Granted: All Community Sub-Lounges Unlocked</span>
        </div>
      </div>

      {/* TWO-PANEL SPLIT SECTION CARD CONTAINER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch w-full flex-1">
        
        {/* ==================== LEFT SIDEBAR PANEL: CHANNELS SELECTION ==================== */}
        <div className="lg:col-span-4 bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-[#1e293b] rounded-2xl p-4 space-y-4 flex flex-col shadow-xs">
          <div>
            <h3 className="font-bold text-xs uppercase tracking-wider text-gray-400">Available Lounges</h3>
            <p className="text-[11px] text-gray-400 mt-0.5">Showing {filteredChannels.length} active global discussion rooms</p>
          </div>

          {/* Sidebar text search widget */}
          <div className="relative flex items-center">
            <FiSearch className="absolute left-2.5 text-gray-400 text-xs" />
            <input 
              type="text"
              placeholder="Search community hubs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-8 pr-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#1e293b]/40 text-gray-900 dark:text-white outline-none focus:border-blue-500 font-medium"
            />
          </div>

          {/* Channels selection item mapped rows loop */}
          <div className="space-y-1.5 flex-1 overflow-y-auto pr-0.5 max-h-[60vh]">
            {filteredChannels.map((chan) => (
              <div
                key={chan.id}
                onClick={() => setSelectedTradeLounge(chan)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                  selectedChannel.id === chan.id
                    ? "border-blue-500 bg-blue-50/40 dark:bg-blue-950/20 shadow-xs"
                    : "border-gray-50 dark:border-gray-800/60 hover:bg-gray-50 dark:hover:bg-[#1e293b]/50"
                }`}
              >
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${chan.bannerColor} flex items-center justify-center text-white font-black text-sm shadow-xs`}>
                  {chan.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-xs text-gray-900 dark:text-white truncate">{chan.name}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5 flex items-center gap-1.5">
                    <span className="flex items-center gap-0.5"><FiUsers /> {chan.members}</span>
                    <span className="flex items-center gap-0.5"><FiMessageSquare /> {chan.posts} posts</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* ==================== RIGHT PANEL: OPEN COMMUNITY CHANNEL SPACE ==================== */}
        <div className="lg:col-span-8 bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-[#1e293b] rounded-2xl flex flex-col justify-between shadow-xs overflow-hidden min-h-[65vh]">
          
          {/* Active Workspace Node Content */}
          <div className="flex flex-col flex-1">
            
            {/* Top wide cover image banner background precisely mimicking TradeFXBook UI setup */}
            <div className="relative">
              <div className={`h-28 bg-gradient-to-r ${selectedChannel.bannerColor} w-full opacity-80 dark:opacity-60 relative`} />
              
              {/* Profile image floating overlap overlay layout row */}
              <div className="px-6 pb-4 flex flex-col sm:flex-row sm:items-end gap-3 -mt-8 relative z-10">
                <div className={`w-16 h-14 rounded-2xl bg-gradient-to-br ${selectedChannel.bannerColor} border-4 border-white dark:border-[#0f172a] flex items-center justify-center text-white font-black text-xl shadow-md`}>
                  {selectedChannel.avatar}
                </div>
                <div className="mb-0.5">
                  <h3 className="text-base font-black text-gray-900 dark:text-white flex items-center gap-2">
                    {selectedChannel.name}
                  </h3>
                  <p className="text-[11px] text-gray-400 font-semibold mt-0.5">
                    {selectedChannel.members.toLocaleString()} members logged • {selectedChannel.posts} historical alpha briefings
                  </p>
                </div>
              </div>
            </div>

            {/* MESSAGE FEED WINDOW WRAPPER LOOP */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4 max-h-[45vh] border-t border-gray-50 dark:border-gray-800/80 bg-gray-50/20 dark:bg-transparent">
              {chatMessages.map((msg) => {
                const isMe = msg.user === "Mohammadshafee Wasta";
                return (
                  <div key={msg.id} className={`flex flex-col gap-1 max-w-[85%] ${isMe ? "ml-auto items-end" : "mr-auto items-start"}`}>
                    <div className="flex items-baseline gap-2 text-[10px] text-gray-400 font-bold px-1">
                      <span className="text-gray-700 dark:text-gray-300">{msg.user}</span>
                      <span className="bg-gray-100 dark:bg-gray-800 text-gray-400 px-1 rounded-xs font-medium scale-90">{msg.meta}</span>
                      <span className="font-normal opacity-70">{msg.time}</span>
                    </div>
                    
                    <div className={`p-3 rounded-2xl text-xs font-medium shadow-2xs leading-relaxed border ${
                      isMe 
                        ? "bg-blue-500 text-white border-blue-600 rounded-tr-xs" 
                        : "bg-white dark:bg-[#1e293b] text-gray-800 dark:text-gray-200 border-gray-100 dark:border-gray-800 rounded-tl-xs"
                    }`}>
                      {msg.text}
                    </div>

                    <button 
                      onClick={() => alert("Liked post message node content parameters")}
                      className="text-[10px] text-gray-400 hover:text-red-500 flex items-center gap-1 mt-0.5 px-1 font-semibold transition-colors bg-transparent border-none cursor-pointer outline-none"
                    >
                      <FiHeart className="text-[11px]" />
                      <span>{msg.likes}</span>
                    </button>
                  </div>
                );
              })}
            </div>

          </div>
          {/* BOTTOM INTERACTIVE TEXT DESK SUB-INPUT FORM BLOCK */}
          <form 
            onSubmit={handleDispatchMessage}
            className="p-4 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-[#0f172a] flex items-center gap-2"
          >
            <div className="relative flex-1 flex items-center">
              <input 
                type="text"
                placeholder={`Message #${selectedChannel.name}...`}
                value={typedMessage}
                onChange={(e) => setTypedMessage(e.target.value)}
                className="w-full text-xs pl-4 pr-10 py-2.5 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1e293b]/50 rounded-xl outline-none focus:border-blue-500 text-gray-900 dark:text-white font-medium"
              />
            </div>
            
            <button 
              type="submit"
              className="p-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl shadow-xs transition-all flex items-center justify-center cursor-pointer border-none outline-none shrink-0"
              title="Broadcast Message"
            >
              <FiSend className="text-sm" />
            </button>
          </form>

        </div>

      </div>
    </div>
  );
}
