"use client"

import { Suspense } from 'react'
import Link from 'next/link'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import CircularProgress from '@mui/material/CircularProgress'
import { InstagramKpiCards, InstagramTrend, InstagramPostTable, NaverTrends } from '@/features/marketing-dashboard'
import { mockInstagramKPI, mockInstagramDaily, mockInstagramPosts } from '@/mock-data'

export default function MarketingDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <header className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-sm">
          <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
          <span className="text-gray-300">/</span>
          <Link href="/nuflaat" className="text-gray-500 hover:text-gray-700">Nuflaat</Link>
          <span className="text-gray-300">/</span>
          <Link href="/nuflaat/marketing" className="text-gray-500 hover:text-gray-700">Marketing</Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-900 font-medium">Marketing Dashboard</span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* Page Title */}
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Typography variant="h5" fontWeight={700}>
            Marketing Dashboard
          </Typography>         
        </Stack>

        <Divider />

        {/* 키워드 트렌드 */}
        <NaverTrends />

        <Divider />

        {/* KPI Cards */}
        <Suspense fallback={<Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}><CircularProgress /></Box>}>
          <InstagramKpiCards kpi={mockInstagramKPI} />
        </Suspense>

        {/* Trend Chart */}
        <Box>
          <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
            일별 도달·좋아요·저장 추이
          </Typography>
          <Suspense fallback={<Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}><CircularProgress /></Box>}>
            <InstagramTrend data={mockInstagramDaily} />
          </Suspense>
        </Box>

        {/* Post Performance Table */}
        <Box>
          <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
            게시물별 성과
          </Typography>
          <Suspense fallback={<Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}><CircularProgress /></Box>}>
            <InstagramPostTable posts={mockInstagramPosts} />
          </Suspense>
        </Box>
      </main>
    </div>
  )
}
