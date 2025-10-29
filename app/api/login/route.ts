import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { password } = await req.json();
    const ok = password === process.env.PASSWORD;
    if (!ok) {
      return NextResponse.json({ ok: false, message: "Senha inválida" }, { status: 401 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, message: "Erro na autenticação" }, { status: 400 });
  }
}