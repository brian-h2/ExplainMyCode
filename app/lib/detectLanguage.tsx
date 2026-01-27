export type Language = "javascript" | "typescript" | "python" | "csharp"  | "java" | "unknown";

export function detectLanguage(code: string): Language {


    const codeLower = code.toLowerCase();

    if(
        codeLower.includes("import ") ||
        codeLower.includes("console.log") ||
        codeLower.includes("function ") ||
        codeLower.includes("const ") ||
        codeLower.includes("let ") ||
        codeLower.includes("=>")
    ) {
        return "javascript";
    }

    if(
        codeLower.includes("def ") ||
        codeLower.includes("print(") ||
        codeLower.includes("import ")
    ) {
        return "python";
    }

    if(
        codeLower.includes("using ") ||
        codeLower.includes("namespace ") ||
        codeLower.includes("Console.WriteLine") ||
        codeLower.includes("class ")
    ) {
        return "csharp";
    }

    if(
        codeLower.includes("public class ") ||
        codeLower.includes("System.out.println") ||
        codeLower.includes("import ")
    ) {
        return "java";
    }

    return "unknown";
    
}