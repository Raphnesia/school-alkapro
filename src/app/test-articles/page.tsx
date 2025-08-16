'use client'

import { useState, useEffect } from 'react'

export default function TestArticlesPage() {
  const [articles, setArticles] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const testArticles = async () => {
      try {
        setLoading(true)
        console.log('🧪 Testing articles endpoint...')
        
        // Test proxy endpoint
        const response = await fetch('/api/proxy/articles')
        console.log('📡 Response status:', response.status)
        console.log('📡 Response headers:', response.headers)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        console.log('📊 Articles data:', data)
        setArticles(data)
        
      } catch (err) {
        console.error('❌ Error testing articles:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    testArticles()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Testing articles endpoint...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-600">
          <h1 className="text-2xl font-bold mb-4">Error Testing Articles</h1>
          <p className="mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">Articles Test Results</h1>
      
      <div className="bg-gray-100 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Raw API Response</h2>
        <pre className="bg-white p-4 rounded overflow-auto text-sm">
          {JSON.stringify(articles, null, 2)}
        </pre>
      </div>

      {articles?.data && (
        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Articles List</h2>
          <div className="space-y-4">
            {articles.data.map((article: any, index: number) => (
              <div key={index} className="bg-white p-4 rounded border">
                <h3 className="font-semibold">{article.title}</h3>
                <p className="text-gray-600 text-sm">Slug: {article.slug}</p>
                <p className="text-gray-600 text-sm">Category: {article.category}</p>
                <p className="text-gray-600 text-sm">Author: {article.author}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
} 