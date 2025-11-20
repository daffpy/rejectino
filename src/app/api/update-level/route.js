import { cookies } from "next/headers";

export async function POST(req) {
  const { level } = await req.json();

  cookies().set("level", String(level), {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return new Response("OK");
}