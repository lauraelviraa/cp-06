"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCards } from "@/lib/api";
import CardItem from "@/components/CardItem";
import type { PokemonCard } from "@/types/pokemon";

export default function CardsPage() {
  const [cards, setCards] = useState<PokemonCard[]>([]);
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const logged = localStorage.getItem("logged");
    if (!logged) {
      router.replace("/login");
      return;
    }
    const fav = JSON.parse(localStorage.getItem("fav") || "[]");
    setFavorites(fav);
    load(""); // pré-carregada (máx. 15)
  }, []);

  async function load(q: string) {
    setLoading(true);
    try {
      const data = await getCards(q);
      setCards(data);
    } finally {
      setLoading(false);
    }
  }

  function toggleFav(id: string) {
    const updated = favorites.includes(id)
      ? favorites.filter((f) => f !== id)
      : [...favorites, id];
    setFavorites(updated);
    localStorage.setItem("fav", JSON.stringify(updated));
  }

  function logout() {
    localStorage.removeItem("logged");
    localStorage.removeItem("fav"); // limpa favoritos ao deslogar
    router.replace("/login");
  }

  return (
    <div className="max-w-5xl mx-auto p-5">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Pokémon TCG Explorer</h1>
        <button onClick={logout} className="bg-red-600 text-white px-4 py-2 rounded">
          Logout
        </button>
      </div>

      <h2 className="text-xl mt-4 mb-2 font-semibold">Lista de Pokémon</h2>

      <div className="flex gap-2">
        <input
          className="border rounded px-3 py-2 w-72"
          placeholder="Digite um nome (ex: charizard)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={() => load(search)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Buscar
        </button>
      </div>

      {loading ? (
        <p className="mt-6">Carregando...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          {cards.map((c) => (
            <CardItem key={c.id} card={c} favorites={favorites} toggleFav={toggleFav} />
          ))}
        </div>
      )}
    </div>
  );
}