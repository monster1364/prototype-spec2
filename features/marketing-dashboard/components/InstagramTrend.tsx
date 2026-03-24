"use client"

import Box from '@mui/material/Box'
import { LineChart } from '@mui/x-charts/LineChart'
import type { InstagramDailyMetric } from '../models/types'

interface Props {
  data: InstagramDailyMetric[]
}

function formatDateLabel(dateStr: string): string {
  const parts = dateStr.split('-')
  return `${parts[1]}/${parts[2]}`
}

function formatK(v: number): string {
  return v >= 1000 ? `${(v / 1000).toFixed(0)}K` : String(v)
}

export default function InstagramTrend({ data }: Props) {
  const xLabels = data.map((d) => formatDateLabel(d.date))
  const reachSeries = data.map((d) => d.reach)
  const likesSeries = data.map((d) => d.likes)
  const savesSeries = data.map((d) => d.saves)

  return (
    <Box>
      <LineChart
        height={240}
        series={[
          { data: reachSeries, label: '도달', color: '#1976d2' },
          { data: likesSeries, label: '좋아요', color: '#e91e63' },
          { data: savesSeries, label: '저장', color: '#ff9800' },
        ]}
        xAxis={[{ scaleType: 'point', data: xLabels }]}
        yAxis={[{
          valueFormatter: (v: number) => formatK(v),
        }]}
        sx={{ '& .MuiLineElement-root': { strokeWidth: 2 } }}
      />
    </Box>
  )
}
