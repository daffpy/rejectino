import { cookies } from "next/headers";

export async function updateLevel(level) {
  cookies().set("level", String(level), {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });
}