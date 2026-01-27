"use client";

import { useState } from "react";
import { detectLanguage } from "./lib/detectLanguage";
import { AIBubble } from "./ui/AIBubble";
import { UserBubble } from "./ui/UserBubble";

export default function Home() {
    // Set a state variable to hold the fetched data
    const [code, setCode] = useState("");
    const [language, setLanguage] = useState("javascript");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<ExplainResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    async function handleAnalyze() {
        setLoading(true);
        setError(null);

        try {
            // Make the API request whit the user-provided code and language
            const res = await fetch("/api/explain", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code, language: language === "unknown" ? detectLanguage(code) : language }),
                //Validate the language before sending if it's set to "unknown" 
            });

            // Check if the response is ok
            if (!res.ok) {
                throw new Error(`Error: ${res.status} ${res.statusText}`);
            }

            const data = await res.json();
            setResult(data);
            setLoading(false);
        } catch (e) {
            setError("Something went wrong analyzing your code.");
        } finally {
            setLoading(false);
        }
    }

    return (
         <main className="min-h-screen bg-slate-100 text-slate-900 flex flex-col items-center py-10 px-4">
            <div className="w-full max-w-2xl space-y-6">

                {/* Chat Title */}
                <h1 className="text-2xl font-bold text-center mb-4">Explain My Code</h1>

                {/* Chat Messages Area */}
                <div>


                {/* AI RESPONSES */}
                {result && (
                    <div className="space-y-4">

                    {/* 🧠 Explanation */}
                    <AIBubble>
                        <h3 className="font-bold mb-1">🧠 Explanation</h3>
                        <p className="text-sm leading-relaxed">
                        {result.explanation}
                        </p>
                    </AIBubble>

                    {/* ⚠️ Issues */}
                    <AIBubble>
                        <h3 className="font-bold mb-1">⚠️ Issues</h3>
                        {result.issues.length === 0 ? (
                        <p className="text-sm text-slate-500">No issues found 🎉</p>
                        ) : (
                        <ul className="space-y-2 text-sm">
                            {result.issues.map((i, idx) => (
                            <li key={idx} className="flex gap-2 items-start">
                                <span
                                className={`px-2 py-0.5 text-xs rounded font-semibold ${
                                    i.severity === "high"
                                    ? "bg-red-200 text-red-900"
                                    : i.severity === "medium"
                                    ? "bg-yellow-200 text-yellow-900"
                                    : "bg-green-200 text-green-900"
                                }`}
                                >
                                {i.severity}
                                </span>
                                <span>{i.message}</span>
                            </li>
                            ))}
                        </ul>
                        )}
                    </AIBubble>

                    {/* 🚀 Improvements */}
                    <AIBubble>
                        <h3 className="font-bold mb-1">🚀 Improvements</h3>
                        {result.improvements.length === 0 ? (
                        <p className="text-sm text-slate-500">
                            No improvements suggested.
                        </p>
                        ) : (
                        <ul className="list-disc list-inside space-y-1 text-sm">
                            {result.improvements.map((imp, i) => (
                            <li key={i}>{imp.message}</li>
                            ))}
                        </ul>
                        )}
                    </AIBubble>

                    </div>
                )}
                </div>

                {/* INPUT AREA */}
                <div className="p-4 bg-white border rounded-xl shadow space-y-4">

                <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full h-40 p-3 border rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Paste your code here..."
                />

                <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="p-2 border rounded-md w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="javascript">JavaScript</option>
                    <option value="typescript">TypeScript</option>
                    <option value="python">Python</option>
                    <option value="csharp">C#</option>
                    <option value="java">Java</option>
                    <option value="unknown">Detect Automatically</option>
                </select>

                {error && <p className="text-red-600 text-sm">{error}</p>}

                <button
                    onClick={handleAnalyze}
                    disabled={loading}
                    className="w-full py-2 rounded-md bg-gray-600 text-white cursor-pointer hover:bg-gray-700 transition disabled:opacity-50"
                >
                    {loading ? "Analyzing..." : "Analyze Code"}
                </button>

                </div>
            </div>
            </main>

    )
}
