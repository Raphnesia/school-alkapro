'use client';

import { useEffect, useState } from 'react';
import { dataFetchers, helpers } from '@/lib/site-config';

interface ApiStatus {
  endpoint: string;
  status: 'loading' | 'success' | 'error';
  data?: any;
  error?: string;
}

export default function TestConnectionPage() {
  const [apiStatuses, setApiStatuses] = useState<ApiStatus[]>([]);
  const [overallStatus, setOverallStatus] = useState<'loading' | 'connected' | 'failed'>('loading');

  useEffect(() => {
    testAllConnections();
  }, []);

  const testAllConnections = async () => {
    const endpoints = [
      { name: 'Home Sections', fetcher: dataFetchers.getHomePageData },
      { name: 'Teachers', fetcher: () => dataFetchers.getProfilePageData() },
      { name: 'News', fetcher: () => dataFetchers.getNewsPageData(1) },
      { name: 'Articles', fetcher: () => dataFetchers.getArticlesPageData(1) },
      { name: 'Facilities', fetcher: dataFetchers.getFacilitiesPageData },
      { name: 'Activities', fetcher: () => dataFetchers.getActivitiesPageData(1) },
    ];

    const statuses: ApiStatus[] = [];
    let successCount = 0;

    for (const endpoint of endpoints) {
      try {
        setApiStatuses(prev => [...prev, { endpoint: endpoint.name, status: 'loading' }]);
        
        const data = await endpoint.fetcher();
        statuses.push({
          endpoint: endpoint.name,
          status: 'success',
          data: Array.isArray(data) 
            ? data.length 
            : 'data' in data 
              ? data.data?.length || 0
              : Object.values(data).reduce((sum, arr) => sum + (Array.isArray(arr) ? arr.length : 0), 0)
        });
        successCount++;
      } catch (error) {
        statuses.push({
          endpoint: endpoint.name,
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
      
      setApiStatuses(statuses);
    }

    setOverallStatus(successCount === endpoints.length ? 'connected' : 'failed');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'loading': return '🔄';
      case 'success': return '✅';
      case 'error': return '❌';
      default: return '⏳';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'loading': return 'text-yellow-600';
      case 'success': return 'text-green-600';
      case 'error': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Test Koneksi API
          </h1>
          <p className="text-gray-600 mb-6">
            Halaman ini digunakan untuk memverifikasi koneksi antara Next.js frontend dengan Laravel backend
          </p>
          
          <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
            overallStatus === 'loading' ? 'bg-yellow-100 text-yellow-800' :
            overallStatus === 'connected' ? 'bg-green-100 text-green-800' :
            'bg-red-100 text-red-800'
          }`}>
            {overallStatus === 'loading' && '🔄 Testing...'}
            {overallStatus === 'connected' && '✅ All Connected'}
            {overallStatus === 'failed' && '❌ Connection Failed'}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Status Koneksi API</h2>
          <div className="space-y-3">
            {apiStatuses.map((status, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{getStatusIcon(status.status)}</span>
                  <span className="font-medium">{status.endpoint}</span>
                </div>
                <div className={`text-sm ${getStatusColor(status.status)}`}>
                  {status.status === 'success' && `${status.data} items found`}
                  {status.status === 'error' && status.error}
                  {status.status === 'loading' && 'Loading...'}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Cara Menggunakan</h3>
          <div className="text-sm text-blue-800 space-y-2">
            <p><strong>1. Backend Laravel:</strong> Pastikan Laravel backend sudah berjalan di <code className="bg-blue-100 px-2 py-1 rounded">http://localhost:8000</code></p>
            <p><strong>2. Frontend Next.js:</strong> Jalankan Next.js dengan perintah: <code className="bg-blue-100 px-2 py-1 rounded">npm run dev</code></p>
            <p><strong>3. Environment:</strong> Pastikan file <code className="bg-blue-100 px-2 py-1 rounded">.env.local</code> sudah dikonfigurasi dengan benar</p>
            <p><strong>4. Database:</strong> Pastikan database sudah di-migrate dan ada data</p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <a 
            href="/" 
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Kembali ke Halaman Utama
          </a>
        </div>
      </div>
    </div>
  );
}