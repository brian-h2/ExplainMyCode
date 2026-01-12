// Function to safely parse the explain result from a raw JSON string
// Use the omit for id since it's not needed here
function safeParseExplainResult(raw: string): Omit<ExplainResult, 'id'> | null {
    try {
        const parsed = JSON.parse(raw);

        const firstBrace = parsed.indexOf("{"); // Find the first opening brace
        const lastBrace = parsed.lastIndexOf("}"); // Find the last closing brace

        if (firstBrace === -1 || lastBrace === -1) {
            throw new Error("No JSON found in model response");
        }

        const jsonSlice = raw.slice(firstBrace, lastBrace + 1); // Extract the JSON substring
        // Result: jsonSlice contains the JSON part of the response

        let parsedJson: any;

        try {
            parsedJson = JSON.parse(jsonSlice);
            // Validate required fields
            if (typeof parsedJson.explanation !== "string" ||
                !Array.isArray(parsedJson.issues) ||
                !Array.isArray(parsedJson.improvements)) {
                throw new Error("Parsed JSON does not match expected structure");
            }
            return {
                // Return the parsed result without the id
                explanation: parsedJson.explanation,
                issues: parsedJson.issues,
                improvements: parsedJson.improvements
            };
        } catch {
        throw new Error("Invalid JSON returned by model");
        }

    } catch (e) {
        return null;
    }
}

export default safeParseExplainResult;