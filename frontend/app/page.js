'use client'

import { useEffect, useState } from 'react'

export default function Home() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchArticles = async () => {
    try {
      const res = await fetch('http://localhost:8000/articles')
      if (!res.ok) throw new Error('取得に失敗しました')
      const data = await res.json()
      setArticles(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const seedData = async () => {
    await fetch('http://localhost:8000/articles/seed', { method: 'POST' })
    fetchArticles()
  }

  if (loading) return <p style={{ padding: '20px' }}>読み込み中...</p>
  if (error) return <p style={{ padding: '20px', color: 'red' }}>エラー: {error}</p>

  return (
    <main style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>📝 記事一覧</h1>
      
      {articles.length === 0 ? (
        <div>
          <p>記事がありません</p>
          <button onClick={seedData} style={buttonStyle}>
            サンプルデータを投入
          </button>
        </div>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {articles.map((article) => (
            <li key={article.id} style={cardStyle}>
              <h2 style={{ margin: '0 0 10px 0' }}>{article.title}</h2>
              <p style={{ color: '#666', margin: '0 0 10px 0' }}>{article.content}</p>
              <small style={{ color: '#999' }}>
                作成日: {new Date(article.created_at).toLocaleDateString('ja-JP')}
              </small>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}

const cardStyle = {
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '16px',
  marginBottom: '12px',
  backgroundColor: '#fafafa',
}

const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#0070f3',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
}
