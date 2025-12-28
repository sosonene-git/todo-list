export const metadata = {
  title: '記事一覧',
  description: '記事管理アプリ',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body style={{ margin: 0, fontFamily: 'sans-serif' }}>{children}</body>
    </html>
  )
}
