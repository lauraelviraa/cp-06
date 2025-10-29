export const metadata = { title: "Pokémon TCG Explorer" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-slate-100 min-h-screen">{children} 
        
        
        
        
        <footer style={{ 
  textAlign: "center", 
  marginTop: "40px",
  padding: "20px",
  fontSize: "14px",
  color: "#444"
}}>
  Desenvolvido por: <br />
  <strong>Lorena Steinwascher — RM 561712</strong> <br />
  <strong>Laura Elvira — RM 562204</strong> <br />
  <strong>Isabelly Romano — RM 564217</strong> <br /><br />
  CP-06 • FIAP
</footer>
        
        
        
        
         </body> 
    </html>
  );
}