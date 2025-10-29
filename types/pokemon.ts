export interface PokemonCard {
  id: string;
  name: string;
  images: { large: string };
  nationalPokedexNumbers?: number[];
  types?: string[];
  hp?: string;
}