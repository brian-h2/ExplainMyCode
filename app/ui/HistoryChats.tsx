"use client";

import { useEffect, useState } from "react";
import { AIBubble } from "./AIBubble";
import { UserBubble } from "./UserBubble";

export default function HistoryChats({ onSelect }: { onSelect: (item: any) => void }) {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        fetch("/api/history")
            .then((res) => res.json())
            .then((data) => setHistory(data))
            .catch((error) => console.error("Error fetching history:", error));
    }, []);

    return (
      <aside className="w-64 bg-white border-r h-full p-4 overflow-auto shadow-sm">
        <h2 className="font-bold mb-3">History</h2>

        <ul className="space-y-2">
          {history.map((item: any) => (
            <li
              key={item.id}
              onClick={() => onSelect(item)}
              className="p-2 bg-slate-50 hover:bg-slate-200 rounded cursor-pointer text-sm"
            >
              {new Date(item.createdAt).toLocaleString()}  
            </li>
          ))}
        </ul>
      </aside>
    )
}