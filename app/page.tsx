"use client";

import { useState } from "react";

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
                body: JSON.stringify({ code, language }),
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
         <main className="min-h-screen bg-slate-100 text-slate-900 flex items-center justify-center">
          <div className="w-full max-w-xl p-6 bg-white rounded-xl shadow-lg space-y-4">
            <h1 className="text-2xl font-bold">Explain my code</h1>

            {/* Analyze code textarea */}
            <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-40 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Paste your code here..."
                rows={10}
                cols={50}
                style={{ width: "100%", marginBottom: 12 }}
            ></textarea>

            {/* Language selection dropdown */}
            <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                <option value="javascript">JavaScript</option>
                <option value="typescript">TypeScript</option>
                <option value="python">Python</option>
                <option value="csharp">C#</option>
            </select>

            <button onClick={handleAnalyze} disabled={loading} className="w-full py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition" style={{ marginLeft: 12 }}>
                {loading ? "Analyzing..." : "Analyze Code"}
            </button>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {result && (
                <section>
                <h2>Explanation</h2>
                <p>{result.explanation}</p>

                <h2>Issues</h2>
                <ul>
                    {result.issues.map((i, idx) => (
                    <li key={idx}>
                        [{i.severity}] {i.message}
                    </li>
                    ))}
                </ul>

                <h2>Improvements</h2>
                <ul>
                    {result.improvements.map((i, idx) => (
                    <li key={idx}>{i.message}</li>
                    ))}
                </ul>
                </section>
            )}
          </div>
        </main>
    )
}
