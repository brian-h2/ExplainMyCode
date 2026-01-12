// Now define the result of the explanation
type ExplainResult = {
    id: string;
    explanation: string;
    issues: { message: string; severity: 'low' | 'medium' | 'high' }[];
    improvements: { message: string }[];
}