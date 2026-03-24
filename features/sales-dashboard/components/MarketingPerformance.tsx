'use client'

import {
  Box,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import type { MarketingChannelItem, CampaignItem, MarketingKPI } from '../models/types'

interface Props {
  kpi: MarketingKPI
  channels: MarketingChannelItem[]
  campaigns: CampaignItem[]
}

function RoasBadge({ roas }: { roas: number }) {
  const color = roas >= 8 ? '#16a34a' : roas >= 3 ? '#1976d2' : '#dc2626'
  const bg = roas >= 8 ? '#dcfce7' : roas >= 3 ? '#dbeafe' : '#fee2e2'
  return (
    <Typography
      component="span"
      fontSize={12}
      fontWeight={700}
      sx={{ color, bgcolor: bg, px: 0.8, py: 0.2, borderRadius: 0.8, display: 'inline-block' }}
    >
      {roas.toFixed(1)}x
    </Typography>
  )
}

export function MarketingPerformance({ kpi, channels, campaigns }: Props) {
  const maxRevenue = Math.max(...channels.map((c) => c.revenue))

  return (
    <Paper variant="outlined" sx={{ p: 2.5, mb: 2.5 }}>
      {/* 헤더 */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Typography fontWeight={700} fontSize={15}>마케팅 채널 성과</Typography>
        <Chip
          label="연동 필요 · GA/광고"
          size="small"
          sx={{ fontSize: 11, bgcolor: '#f1f5f9', color: '#475569', fontWeight: 600 }}
        />
      </Box>

      {/* KPI 카드 */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1.5, mb: 2.5 }}>
        {[
          { label: '전체 ROAS', value: `${kpi.totalRoas.toFixed(1)}x`, delta: `▲${kpi.roasDelta.toFixed(1)}`, highlight: true },
          { label: '광고 기여 매출', value: `${(kpi.adRevenue / 100_000_000).toFixed(1)}억원`, delta: `▲${kpi.adRevenueDelta.toFixed(1)}%` },
          { label: '광고비 합계', value: `${(kpi.adSpend / 1_000_000).toFixed(0)}백만원`, delta: '' },
          { label: '광고 전환 주문', value: `${kpi.adOrders.toLocaleString()}건`, delta: '' },
        ].map((card) => (
          <Box
            key={card.label}
            sx={{
              border: '1px solid',
              borderColor: card.highlight ? '#1976d2' : 'divider',
              borderRadius: 1.5,
              p: 1.5,
              bgcolor: card.highlight ? '#f0f7ff' : 'background.paper',
            }}
          >
            <Typography fontSize={11} color="text.secondary" mb={0.5}>{card.label}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
              <Typography fontSize={18} fontWeight={700} color={card.highlight ? '#1976d2' : 'text.primary'}>
                {card.value}
              </Typography>
              {card.delta && (
                <Typography fontSize={11} color="success.main" fontWeight={600}>{card.delta}</Typography>
              )}
            </Box>
          </Box>
        ))}
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2.5 }}>

        {/* 좌: 유입 채널별 성과 */}
        <Box>
          <Typography fontSize={13} fontWeight={600} color="text.secondary" mb={1}>
            유입 채널별 성과
          </Typography>
          {channels.map((ch) => (
            <Box key={ch.channel} sx={{ mb: 1.8 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.4, alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography fontSize={13} fontWeight={500}>{ch.channel}</Typography>
                  {ch.roas !== undefined && <RoasBadge roas={ch.roas} />}
                </Box>
                <Typography fontSize={12} color="text.secondary">
                  전환 {ch.conversionRate.toFixed(2)}%
                </Typography>
              </Box>
              {/* 매출 바 */}
              <Box sx={{ height: 20, bgcolor: 'grey.100', borderRadius: 1, overflow: 'hidden', position: 'relative' }}>
                <Box
                  sx={{
                    height: '100%',
                    width: `${(ch.revenue / maxRevenue) * 100}%`,
                    bgcolor: ch.roas !== undefined ? '#1976d2' : '#94a3b8',
                    borderRadius: 1,
                    display: 'flex',
                    alignItems: 'center',
                    pl: 1,
                  }}
                >
                  <Typography fontSize={11} color="white" fontWeight={600} noWrap>
                    {(ch.revenue / 100_000_000).toFixed(1)}억
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', gap: 2, mt: 0.3 }}>
                <Typography fontSize={11} color="text.disabled">
                  세션 {ch.sessions.toLocaleString()}
                </Typography>
                <Typography fontSize={11} color="text.disabled">
                  주문 {ch.orders.toLocaleString()}건
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

        {/* 우: 캠페인 성과 테이블 */}
        <Box>
          <Typography fontSize={13} fontWeight={600} color="text.secondary" mb={1}>
            캠페인 성과
          </Typography>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ bgcolor: 'grey.50' }}>
                  <TableCell sx={{ fontSize: 11, fontWeight: 700, py: 0.8 }}>캠페인</TableCell>
                  <TableCell sx={{ fontSize: 11, fontWeight: 700, py: 0.8 }}>채널</TableCell>
                  <TableCell sx={{ fontSize: 11, fontWeight: 700, py: 0.8, textAlign: 'right' }}>광고비</TableCell>
                  <TableCell sx={{ fontSize: 11, fontWeight: 700, py: 0.8, textAlign: 'right' }}>ROAS</TableCell>
                  <TableCell sx={{ fontSize: 11, fontWeight: 700, py: 0.8, textAlign: 'right' }}>전환</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {campaigns.map((c) => (
                  <TableRow key={c.name} hover>
                    <TableCell sx={{ py: 0.8 }}>
                      <Typography fontSize={12} fontWeight={500} noWrap sx={{ maxWidth: 120 }}>
                        {c.name}
                      </Typography>
                      <Typography fontSize={10} color="text.disabled">{c.period}</Typography>
                    </TableCell>
                    <TableCell sx={{ fontSize: 11, py: 0.8, color: 'text.secondary' }}>
                      {c.channel}
                    </TableCell>
                    <TableCell sx={{ fontSize: 12, py: 0.8, textAlign: 'right', color: 'text.secondary' }}>
                      {(c.spend / 1_000_000).toFixed(1)}M
                    </TableCell>
                    <TableCell sx={{ py: 0.8, textAlign: 'right' }}>
                      <RoasBadge roas={c.roas} />
                    </TableCell>
                    <TableCell sx={{ fontSize: 12, py: 0.8, textAlign: 'right', color: 'text.secondary' }}>
                      {c.orders}건
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ mt: 1.5, p: 1, bgcolor: '#fef3c7', borderRadius: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <TrendingUpIcon sx={{ fontSize: 13, color: '#92400e' }} />
              <Typography fontSize={11} color="#92400e" fontWeight={600}>
                ROAS 3.0 미만 캠페인 효율 검토 필요
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Paper>
  )
}
