"use client"

import { Box, Chip, Grid, Paper, Stack, Typography } from '@mui/material'
import type { InstagramKPI } from '../models/types'

interface Props {
  kpi: InstagramKPI
}

interface KpiCardProps {
  label: string
  value: string
  sub?: React.ReactNode
}

function KpiCard({ label, value, sub }: KpiCardProps) {
  return (
    <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
        {label}
      </Typography>
      <Typography variant="h5" fontWeight={700} sx={{ mb: sub ? 0.5 : 0 }}>
        {value}
      </Typography>
      {sub && (
        <Box sx={{ mt: 0.5 }}>
          {sub}
        </Box>
      )}
    </Paper>
  )
}

export default function InstagramKpiCards({ kpi }: Props) {
  const isPositive = kpi.followersDelta >= 0

  const followerSub = (
    <Stack direction="row" alignItems="center" spacing={0.5}>
      <Typography
        variant="body2"
        sx={{ color: isPositive ? 'success.main' : 'error.main', fontWeight: 600 }}
      >
        {isPositive ? '▲' : '▼'} {Math.abs(kpi.followersDelta).toLocaleString()}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        ({isPositive ? '+' : ''}{kpi.followersDeltaRate.toFixed(2)}%)
      </Typography>
    </Stack>
  )

  return (
    <Box>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
        <Typography variant="subtitle1" fontWeight={600}>
          Instagram KPI
        </Typography>
        <Chip label="Meta Graph API 연동 필요" size="small" color="warning" variant="outlined" />
      </Stack>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <KpiCard
            label="팔로워 수"
            value={kpi.followers.toLocaleString()}
            sub={followerSub}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <KpiCard
            label="총 도달수"
            value={kpi.totalReach.toLocaleString()}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <KpiCard
            label="총 좋아요"
            value={kpi.totalLikes.toLocaleString()}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <KpiCard
            label="총 저장수"
            value={kpi.totalSaves.toLocaleString()}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <KpiCard
            label="총 댓글수"
            value={kpi.totalComments.toLocaleString()}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <KpiCard
            label="평균 참여율"
            value={`${kpi.avgEngagementRate.toFixed(2)}%`}
          />
        </Grid>
      </Grid>
    </Box>
  )
}
