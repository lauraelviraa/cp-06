import type { PokemonCard } from "@/types/pokemon";

const BASE = "https://api.pokemontcg.io/v2/cards";

export async function getCards(query: string = ""): Promise<PokemonCard[]> {
  const url =
    query.trim().length > 0
      ? `${BASE}?q=name:${encodeURIComponent(query)}&orderBy=number,name&perPage=15`
      : `${BASE}?orderBy=number,name&perPage=15`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("Falha ao buscar cartas");
  const json = await res.json();

  // GARANTIA: nunca mais que 15 itens
  const list = (json?.data ?? []) as PokemonCard[];
  return list.slice(0, 15);
}