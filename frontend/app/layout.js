import Link from 'next/link'

export const metadata = {
  title: '記事一覧',
  description: '記事管理アプリ',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body style={{ margin: 0, fontFamily: 'sans-serif', backgroundColor: '#f5f5f5' }}>
        <header style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 20px',
          height: '60px',
          backgroundColor: '#fff',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}>
          <Link href="/" style={{ textDecoration: 'none', color: '#333', fontSize: '1.2rem', fontWeight: 'bold' }}>
            記事管理アプリ
          </Link>
          <Link href="/articles/new" style={{
            backgroundColor: '#0070f3',
            color: '#fff',
            padding: '8px 16px',
            borderRadius: '4px',
            textDecoration: 'none',
            fontWeight: 'bold',
            fontSize: '0.9rem'
          }}>
            投稿する
          </Link>
        </header>
        {children}
      </body>
    </html>
  )
}
