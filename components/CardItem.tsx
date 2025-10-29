"use client";

import Image from "next/image";
import type { PokemonCard } from "@/types/pokemon";

type Props = {
  card: PokemonCard;
  favorites: string[];
  toggleFav: (id: string) => void;
};

export default function CardItem({ card, favorites, toggleFav }: Props) {
  const isFav = favorites.includes(card.id);

  return (
    <div className="border p-3 rounded bg-white shadow">
      <Image
        src={card.images.large}
        alt={card.name}
        width={250}
        height={350}
        className="mx-auto"
      />

      <h3 className="font-bold mt-2 text-center">{card.name}</h3>
      <p className="text-center text-sm text-slate-700">
        #{card.nationalPokedexNumbers?.[0] ?? "-"} • {card.types?.join(", ") ?? "-"} • HP {card.hp ?? "-"}
      </p>

      <button
        onClick={() => toggleFav(card.id)}
        className={`mt-3 w-full py-2 rounded text-white ${
          isFav ? "bg-emerald-700" : "bg-emerald-500"
        }`}
      >
        {isFav ? "Remover dos favoritos" : "Favoritar"}
      </button>
    </div>
  );
}