'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function ArticleDetail() {
  const { id } = useParams()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (id) {
      fetchArticle()
    }
  }, [id])

  const fetchArticle = async () => {
    try {
      const res = await fetch(`http://localhost:8000/articles/${id}`)
      if (!res.ok) throw new Error('記事の取得に失敗しました')
      const data = await res.json()
      setArticle(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <p style={{ padding: '20px' }}>読み込み中...</p>
  if (error) return <p style={{ padding: '20px', color: 'red' }}>エラー: {error}</p>
  if (!article) return <p style={{ padding: '20px' }}>記事が見つかりません</p>

  return (
    <main style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <Link href="/" style={{ color: '#0070f3', textDecoration: 'none', marginBottom: '20px', display: 'inline-block' }}>
        ← 一覧に戻る
      </Link>
      
      <article style={detailStyle}>
        <h1 style={{ fontSize: '2rem', marginBottom: '10px' }}>{article.title}</h1>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#999', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
          <span>👤 投稿者: {article.user}</span>
          <span>📅 作成日: {new Date(article.created_at).toLocaleDateString('ja-JP')}</span>
        </div>
        <div style={{ lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
          {article.content}
        </div>
      </article>
    </main>
  )
}

const detailStyle = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
}
