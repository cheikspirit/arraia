export const metadata = {
  title: 'O Julgamento da Fogueira',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body style={{ margin: 0, fontFamily: 'sans-serif', backgroundColor: '#ffedd5' }}>
        {children}
      </body>
    </html>
  )
}
