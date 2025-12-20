export async function POST(request: Request) {
    console.log("POST request received at /api/explain", request); 
    const { code } = await request.json();
    console.log("Received code for explanation:", code);
    
    // Basic validation
    if(!code) {
        return new Response(JSON.stringify({ error: 'No code provided' }), {
            headers: { 'Content-Type': 'application/json' },
            status: 400,
        });
    }

    // Placeholder explanation logic
    const explanation = `This code snippet contains ${code.length} characters.`;

    // Return response with explanation as JSON
    return new Response(JSON.stringify({ explanation }), {
        headers: { 'Content-Type': 'application/json' },
    });
}

