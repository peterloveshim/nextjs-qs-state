import { NextResponse } from "next/server";

export async function GET() {
  try {
    return new NextResponse(
      JSON.stringify({
        response: "ok",
        data: {
          items: [
            { id: 1, name: "상품1" },
            { id: 2, name: "상품2" },
            { id: 3, name: "상품3" },
          ],
        },
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (err) {
    const message = err.message || "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
