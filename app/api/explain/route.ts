import { NextResponse } from "next/server";
import explainCode from "@/app/lib/AI/Explaincode"; // Recordatory import statement

export async function POST(request: Request) {

    try {
      const body = await request.json();

      if (!body.code || !body.language) {
        return NextResponse.json({ error: "Code and language are required." }, { status: 400 });
      }

      const resultExplain = await explainCode({
        code: body.code,
        language: body.language,
        model: "openai/gpt-oss-120b"
      }) 

      return NextResponse.json({
        ...resultExplain
      }, 
      { status: 200 }
    );

  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }

  //   const response = {
  //   id: crypto.randomUUID(),
  //   explanation: "Explicación de ejemplo",
  //   issues: [
  //     { message: "Uso de variable global", severity: "medium" }
  //   ],
  //   improvements: [
  //     { message: "Encapsular la lógica en una función" }
  //   ]
  // };

  // return NextResponse.json(response, { status: 200 }); // Remplaza el res.json con NextResponse.json
}

