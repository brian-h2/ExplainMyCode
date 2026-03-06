"use client";

import { useState, useRef, useEffect } from "react";
import { Sparkles, Send, Code2, Loader2, AlertTriangle, Lightbulb, BookOpen,ChevronDown } from "lucide-react";
import { detectLanguage } from "./lib/detectLanguage";
import { AIBubble } from "./ui/AIBubble";
import HistoryChats from "./ui/HistoryChats";

export default function Home() {
    const [code, setCode] = useState("");
    const [language, setLanguage] = useState("javascript");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<ExplainResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [currentId, setCurrentId] = useState<string | null>(null);
    const [isLanguageOpen, setIsLanguageOpen] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const LANGUAGES = [
        "JavaScript", "TypeScript", "Python", "Java",
    "C++", "C#", "Ruby", "Go", "Rust", "PHP", "Swift", "Kotlin",
    ];

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [result, loading]);

    async function handleAnalyze() {
        setLoading(true);
        setError(null);

        if (!code.trim()) {
            setError("Please enter some code to analyze.");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/explain", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    code,
                    language: language === "unknown" ? detectLanguage(code) : language,
                }),
            });

            if (!res.ok) {
                throw new Error(`Error: ${res.status} ${res.statusText}`);
            }

            const response = await res.json();
            setResult(response);
            setCode("");
        } catch (e) {
            setError("Something went wrong analyzing your code.");
        } finally {
            setLoading(false);
        }
    }

    const handleNewChat = () => {
        setResult(null);
        setCode("");
        setError(null);
        setCurrentId(null);
    };

    const handleSelect = (item: any) => {
        setResult(item);
        setCurrentId(item.id);
        if (item.language) setLanguage(item.language);
        setError(null);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleAnalyze();
        }
    };

    return (
        <main className="size-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
            <div className="w-full max-w-7xl h-[95vh] flex gap-4">

                {/* ── Sidebar: real HistoryChats component ── */}
                <HistoryChats
                    onSelect={handleSelect}
                    onNewChat={handleNewChat}
                    currentId={currentId}
                />

                {/* ── Main panel ── */}
                <div className="flex-1 flex flex-col bg-slate-800/40 backdrop-blur-xl rounded-3xl shadow-2xl border border-purple-500/20 overflow-hidden">

                    {/* Header */}
                    <div className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-b border-purple-500/30">
                        <div className="p-2 bg-purple-500/20 rounded-xl">
                            <Code2 className="size-6 text-purple-300" />
                        </div>
                        <div className="flex-1">
                            <h1 className="text-white font-bold text-lg leading-tight">Explain My Code</h1>
                            <p className="text-purple-300/70 text-sm">Analyze and improve your code with AI</p>
                        </div>

                        {/* Language selector */}
                        <div className="relative">
                            <button
                                onClick={() => setIsLanguageOpen((v) => !v)}
                                className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 text-purple-100 rounded-xl border border-purple-500/30 hover:border-purple-500/60 transition-all text-sm"
                            >
                                <Code2 className="size-4 text-purple-400" />
                                <span>{language}</span>
                                <ChevronDown className={`size-4 transition-transform duration-200 ${isLanguageOpen ? "rotate-180" : ""}`} />
                            </button>

                            {isLanguageOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-purple-500/30 rounded-xl shadow-2xl overflow-hidden z-20">
                                    <div className="max-h-64 overflow-y-auto">
                                        {LANGUAGES.map((lang) => (
                                            <button
                                                key={lang}
                                                onClick={() => { setLanguage(lang); setIsLanguageOpen(false); }}
                                                className={`w-full text-left px-4 py-2 text-sm transition-all ${
                                                    language === lang
                                                        ? "bg-purple-600/30 text-purple-100"
                                                        : "text-purple-300 hover:bg-slate-700/50"
                                                }`}
                                            >
                                                {lang}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <Sparkles className="size-6 text-pink-400 animate-pulse" />
                    </div>

                    {/* Results area */}
                    <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                        {!result && !loading ? (
                            <div className="h-full flex items-center justify-center">
                                <div className="text-center space-y-4">
                                    <div className="inline-block p-4 bg-purple-500/10 rounded-full">
                                        <Code2 className="size-12 text-purple-400" />
                                    </div>
                                    <div>
                                        <h2 className="text-purple-200 font-semibold mb-2">Start analyzing your code</h2>
                                        <p className="text-purple-400/60 text-sm">
                                            Select a language, paste your code, and get instant feedback
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {result && (
                                    <>
                                        {/* Explanation */}
                                        <div className="flex justify-start">
                                            <div className="max-w-[90%] rounded-2xl px-4 py-3 bg-slate-700/50 text-purple-100 border border-purple-500/20">
                                                <AIBubble>
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <BookOpen className="size-4 text-purple-400" />
                                                        <h3 className="font-bold text-purple-200">Explanation</h3>
                                                    </div>
                                                    <p className="text-sm leading-relaxed">{result.explanation}</p>
                                                </AIBubble>
                                            </div>
                                        </div>

                                        {/* Issues */}
                                        <div className="flex justify-start">
                                            <div className="max-w-[90%] rounded-2xl px-4 py-3 bg-slate-700/50 text-purple-100 border border-purple-500/20">
                                                <AIBubble>
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <AlertTriangle className="size-4 text-yellow-400" />
                                                        <h3 className="font-bold text-purple-200">Issues</h3>
                                                    </div>
                                                    {result.issues.length === 0 ? (
                                                        <p className="text-sm text-purple-400/60">No issues found 🎉</p>
                                                    ) : (
                                                        <ul className="space-y-2 text-sm">
                                                            {result.issues.map((issue, idx) => (
                                                                <li key={idx} className="flex gap-2 items-start">
                                                                    <span className={`px-2 py-0.5 text-xs rounded font-semibold flex-shrink-0 ${
                                                                        issue.severity === "high"
                                                                            ? "bg-red-500/20 text-red-300"
                                                                            : issue.severity === "medium"
                                                                            ? "bg-yellow-500/20 text-yellow-300"
                                                                            : "bg-green-500/20 text-green-300"
                                                                    }`}>
                                                                        {issue.severity}
                                                                    </span>
                                                                    <span>{issue.message}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </AIBubble>
                                            </div>
                                        </div>

                                        {/* Improvements */}
                                        <div className="flex justify-start">
                                            <div className="max-w-[90%] rounded-2xl px-4 py-3 bg-slate-700/50 text-purple-100 border border-purple-500/20">
                                                <AIBubble>
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <Lightbulb className="size-4 text-pink-400" />
                                                        <h3 className="font-bold text-purple-200">Improvements</h3>
                                                    </div>
                                                    {result.improvements.length === 0 ? (
                                                        <p className="text-sm text-purple-400/60">No improvements suggested.</p>
                                                    ) : (
                                                        <ul className="list-disc list-inside space-y-1 text-sm">
                                                            {result.improvements.map((imp, i) => (
                                                                <li key={i}>{imp.message}</li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </AIBubble>
                                            </div>
                                        </div>
                                    </>
                                )}

                                {loading && (
                                    <div className="flex justify-start">
                                        <div className="rounded-2xl px-4 py-3 bg-slate-700/50 border border-purple-500/20">
                                            <div className="flex items-center gap-3">
                                                <Loader2 className="size-5 text-purple-400 animate-spin" />
                                                <span className="text-purple-300 text-sm">
                                                    Analyzing your {language} code…
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input area */}
                    <div className="p-4 bg-slate-800/60 border-t border-purple-500/30 space-y-2">
                        <div className="relative">
                            <textarea
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder={`Paste your ${language} code here…`}
                                disabled={loading}
                                className="w-full h-32 px-4 py-3 bg-slate-700/50 text-purple-100 placeholder-purple-400/40 rounded-2xl border border-purple-500/30 focus:border-purple-500/60 focus:outline-none focus:ring-2 focus:ring-purple-500/20 resize-none font-mono text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                            />
                            <button
                                onClick={handleAnalyze}
                                disabled={!code.trim() || loading}
                                className="absolute bottom-3 right-3 p-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-500/30"
                            >
                                {loading
                                    ? <Loader2 className="size-5 animate-spin" />
                                    : <Send className="size-5" />
                                }
                            </button>
                        </div>

                        <div className="flex items-center justify-between">
                            {error ? (
                                <p className="text-red-400 text-xs flex items-center gap-1">
                                    <AlertTriangle className="size-3" /> {error}
                                </p>
                            ) : <span />}
                            <p className="text-purple-400/50 text-xs">
                                Enter to analyze · Shift+Enter for new line
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}