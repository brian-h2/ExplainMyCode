"use client";

import { useEffect, useState } from "react";
import { MessageSquare, Plus, Clock } from "lucide-react";

export default function HistoryChats({
    onSelect,
    onNewChat,
    currentId,
}: {
    onSelect: (item: any) => void;
    onNewChat: () => void;
    currentId?: string | null;
}) {
    const [history, setHistory] = useState<any[]>([]);

    useEffect(() => {
        fetch("/api/history")
            .then((res) => res.json())
            .then((data) => setHistory(data))
            .catch((error) => console.error("Error fetching history:", error));
    }, []);

    return (
        <aside className="w-72 flex-shrink-0 flex flex-col bg-slate-800/40 backdrop-blur-xl rounded-3xl shadow-2xl border border-purple-500/20 overflow-hidden">
            {/* New Chat button */}
            <div className="px-4 py-4 border-b border-purple-500/30">
                <button
                    onClick={onNewChat}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg shadow-purple-500/30"
                >
                    <Plus className="size-5" />
                    <span className="font-medium">New Chat</span>
                </button>
            </div>

            {/* History list */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {history.length === 0 ? (
                    <p className="text-purple-400/40 text-xs text-center mt-6">
                        No chats yet. Analyze some code!
                    </p>
                ) : (
                    history.map((item: any) => (
                        <button
                            key={item.id}
                            onClick={() => onSelect(item)}
                            className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                                currentId === item.id
                                    ? "bg-gradient-to-r from-purple-600/30 to-pink-600/30 border border-purple-500/50"
                                    : "bg-slate-700/30 border border-purple-500/10 hover:bg-slate-700/50 hover:border-purple-500/30"
                            }`}
                        >
                            <div className="flex items-start gap-2">
                                <MessageSquare className="size-4 text-purple-400 mt-0.5 flex-shrink-0" />
                                <div className="min-w-0 flex-1">
                                    <p className="text-purple-100 text-sm truncate">
                                        {item.language ?? "Code"} analysis
                                    </p>
                                    <div className="flex items-center gap-1 mt-1">
                                        <Clock className="size-3 text-purple-400/50" />
                                        <span className="text-xs text-purple-400/50">
                                            {new Date(item.createdAt).toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </button>
                    ))
                )}
            </div>
        </aside>
    );
}