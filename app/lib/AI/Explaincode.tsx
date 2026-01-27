import OpenAI from "openai";
import {BASE_EXPLAIN_PROMPT} from "../../prompt"

const client = new OpenAI({ // Configure the OpenAI client
  apiKey: process.env.GROQ_API_KEY!,
  baseURL: "https://api.groq.com/openai/v1",
});

export default async function explainCode (
    input: ExplainInput
): Promise<ExplainResult> {
    // Validate input parameters 

    if (!input.code) {
        throw new Error("Code parameter is required");
    }

    console.log("Explaining code in language:", input.language);

    const prompt = BASE_EXPLAIN_PROMPT // Prepare the prompt by replacing placeholders
        .replace("{{language}}", input.language || "unknown") // Use "unknown" if language is not provided
        .replace("{{code}}", input.code); // Use the provided code
        

    const completion = await client.chat.completions.create({ // Call the OpenAI API
        model: input.model ?? "openai/gpt-oss-120b",
        messages: [
            { role: "user", content: prompt }
        ],
        temperature: 0.2, // Set temperature for response variability on a scale of 0 to 1 (lower is more deterministic and higher is more creative)
    });

    const raw = completion.choices[0].message.content; // Get the raw response content from the API

    // Parse the response JSON
    // Validate and parse the JSON response
    if(!raw) {
        throw new Error("Empty response from AI");
    } 
    const parsed = JSON.parse(raw);

    return {
        id: completion.id,
        explanation: parsed.explanation,
        issues: parsed.issues,
        improvements: parsed.improvements
    }

    // return {
    //     id: crypto.randomUUID(),
    //     explanation: "This is a dummy explanation of the provided code.",
    //     issues: [
    //         { message: "This is a dummy issue.", severity: "low" }
    //     ],
    //     improvements: [
    //         { message: "This is a dummy improvement suggestion." }
    //     ]
    // }
}
