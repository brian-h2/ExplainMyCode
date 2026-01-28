"use client";

import { useState } from "react";

const LANGUAGES = [
  { value: "javascript", label: "JavaScript", icon: "🟨" },
  { value: "typescript", label: "TypeScript", icon: "🔵" },
  { value: "python", label: "Python", icon: "🐍" },
  { value: "csharp", label: "C#", icon: "⚙️" },
  { value: "java", label: "Java", icon: "☕" },
  { value: "unknown", label: "Detect Automatically", icon: "✨" },
];

export default function LanguageSelect({ value, onChange }: any) {
  const [open, setOpen] = useState(false);

  const selected = LANGUAGES.find((l) => l.value === value);

  return (
    <div className="relative w-full">
      {/* Selector visible */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-3 py-2 border rounded-lg bg-white flex items-center justify-between hover:border-blue-400 transition cursor-pointer"
      >
        <span className="flex items-center gap-2 text-sm">
          <span>{selected?.icon}</span>
          {selected?.label}
        </span>

        <span className="text-xs opacity-60">
          {open ? "▲" : "▼"}
        </span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute left-0 mt-2 w-full bg-white border rounded-lg shadow-lg animate-fadeIn z-20">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.value}
              onClick={() => {
                onChange(lang.value);
                setOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-sm flex items-center gap-2 hover:bg-blue-50 transition ${
                lang.value === value ? "bg-blue-100" : ""
              }`}
            >
              <span>{lang.icon}</span>
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
