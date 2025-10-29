"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        setError(j?.message ?? "Senha incorreta");
        return;
      }

      localStorage.setItem("logged", "true");
      router.push("/cards");
    } catch {
      setError("Erro ao conectar");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleLogin} className="bg-white shadow p-6 rounded w-80">
        <h1 className="text-2xl font-bold text-center mb-4">Login</h1>

        <label className="block text-sm mb-1">Senha</label>
        <input
          type="password"
          className="w-full border rounded px-3 py-2 mb-3"
          placeholder="Digite a senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded px-4 py-2 bg-blue-600 text-white disabled:opacity-60"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}