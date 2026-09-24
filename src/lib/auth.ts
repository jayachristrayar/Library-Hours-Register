import { SignJWT, jwtVerify } from "jose"; import { cookies } from "next/headers"; import { redirect } from "next/navigation"; import type { Role } from "./constants";
const key=()=>new TextEncoder().encode(process.env.AUTH_SECRET);
export type Session={id:number;name:string;role:Role;location:"A_BLOCK"|"B_BLOCK"|"ALL"};
export async function createSession(user:Session){const token=await new SignJWT(user).setProtectedHeader({alg:"HS256"}).setIssuedAt().setExpirationTime("8h").sign(key());(await cookies()).set("library_session",token,{httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"lax",path:"/",maxAge:28800});}
export async function getSession():Promise<Session|null>{const token=(await cookies()).get("library_session")?.value;if(!token)return null;try{return (await jwtVerify(token,key())).payload as unknown as Session}catch{return null}}
export async function requireSession(roles?:Role[]){const session=await getSession();if(!session)redirect("/login");if(roles&&!roles.includes(session.role))redirect(session.role==="PHD_SCHOLAR"?"/circulation":"/records");return session}
export function centralAllowed(role:Role){return role==="SUPER_ADMIN"||role==="LIBRARY_STAFF"}
