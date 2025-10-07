import "server-only";
import { cookies } from "next/headers";
import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { AuthUser } from "@/types/auth-user";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: JWTPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Failed to verify session");
    console.log(error);
  }
}

export async function createSession(user: AuthUser) {
  const cookie = await cookies();
  const expiresAt = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);

  const session = await encrypt({ ...user, expiresAt });

  // create id auth session for get role from cookie
  cookie.set("session", session, {
    httpOnly: true,
    secure: process.env.COOKIE_SECURE === "1",
    expires: expiresAt,
    sameSite: process.env.COOKIE_SECURE === "1" ? "none" : "lax",
    path: "/",
  });

  // set refreshtoken
  // cookie.set("refreshToken", token, {
  //   httpOnly: true,
  //   secure: process.env.COOKIE_SECURE === "1",
  //   expires: expiresAt,
  //   sameSite: process.env.COOKIE_SECURE === "1" ? "none" : "lax",
  //   path: "/",
  // });
}

export async function deleteSession() {
  const cookie = await cookies();
  // cookie.delete("refreshToken");
  cookie.delete("session");
}
