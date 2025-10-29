export const metadata = { title: "Pokémon TCG Explorer" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-slate-100 min-h-screen">{children}</body>
    </html>
  );
}