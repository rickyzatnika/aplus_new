// File: /app/api/cloudinary/route.js (Next.js 14 App Router)
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const activeButton = searchParams.get("activeButton"); // Ambil nilai activeButton dari query parameter

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const apiSecret = process.env.NEXT_PUBLIC_API_SECRET;
  const cloudName = process.env.NEXT_PUBLIC_CLOUD_NAME;
  const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");

  try {
    const response = await axios.get(
      `https://api.cloudinary.com/v1_1/${cloudName}/resources/image?type=upload&prefix=photo/aplus/${activeButton}&max_results=9`,
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    );

    return NextResponse.json(response.data.resources);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching images" },
      { status: 500 }
    );
  }
}
