"use client"

import { Box, Chip, Grid, Paper, Stack, Typography } from "@mui/material"
import TrendingUpIcon from "@mui/icons-material/TrendingUp"
import TrendingDownIcon from "@mui/icons-material/TrendingDown"
import type { SalesDashboardKPI } from "../models/types"
import { formatRevenue, formatRevenueShort, formatDelta, getDeltaColor, formatRatio } from "../modules/utils"

interface Props {
  kpi: SalesDashboardKPI
}

interface KpiCardProps {
  label: string
  value: string
  delta: number
  sub?: string
  invertDelta?: boolean  // true = 음수 delta가 개선 (판매 로스 등)
}

function KpiCard({ label, value, delta, sub, invertDelta }: KpiCardProps) {
  const effectiveDelta = invertDelta ? -delta : delta
  const color = getDeltaColor(effectiveDelta)
  const isUp = delta >= 0
  return (
    <Paper
      variant="outlined"
      sx={{ p: 2, borderRadius: 1.5, height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
    >
      <Typography variant="caption" color="text.secondary" fontWeight={600} fontSize={11} sx={{ textTransform: "uppercase", letterSpacing: "0.05em" }}>
        {label}
      </Typography>
      <Box mt={1}>
        <Typography variant="h6" fontWeight={700} fontSize={20} lineHeight={1.2}>
          {value}
        </Typography>
        {sub && (
          <Typography variant="caption" color="text.disabled" fontSize={11}>{sub}</Typography>
        )}
      </Box>
      <Stack direction="row" alignItems="center" gap={0.25} mt={1}>
        {isUp
          ? <TrendingUpIcon sx={{ fontSize: 14, color }} />
          : <TrendingDownIcon sx={{ fontSize: 14, color }} />
        }
        <Typography variant="caption" sx={{ color, fontWeight: 700, fontSize: 12 }}>
          {formatDelta(delta)}
        </Typography>
        <Typography variant="caption" color="text.disabled" fontSize={11}>전기간 대비</Typography>
      </Stack>
    </Paper>
  )
}

export function KpiSummary({ kpi }: Props) {
  const cards: KpiCardProps[] = [
    {
      label: "총 매출",
      value: formatRevenueShort(kpi.totalRevenue),
      delta: kpi.totalRevenueDelta,
      sub: formatRevenue(kpi.totalRevenue),
    },
    {
      label: "총 주문 수",
      value: kpi.totalOrders.toLocaleString() + "건",
      delta: kpi.totalOrdersDelta,
    },
    {
      label: "평균 주문 금액 (AOV)",
      value: formatRevenueShort(kpi.aov),
      delta: kpi.aovDelta,
      sub: formatRevenue(kpi.aov),
    },
    {
      label: "구매 전환율",
      value: formatRatio(kpi.conversionRate),
      delta: kpi.conversionRateDelta,
    },
    {
      label: "판매 로스",
      value: formatRevenueShort(kpi.salesLoss),
      delta: kpi.salesLossDelta,
      sub: "재고 부족 기회 손실",
      invertDelta: true,
    },
    {
      label: "재입고 알림신청",
      value: kpi.restockAlertCount.toLocaleString() + "건",
      delta: kpi.restockAlertDelta,
    },
  ]

  return (
    <Box mb={2.5}>
      <Stack direction="row" alignItems="center" gap={1} mb={1}>
        <Typography fontWeight={700} fontSize={14}>KPI 요약</Typography>
        <Chip label="매출·전환율·로스 연동 필요" size="small" sx={{ fontSize: 11, bgcolor: '#fef3c7', color: '#92400e', fontWeight: 600 }} />
      </Stack>
      <Grid container spacing={2}>
        {cards.map((card) => (
          <Grid size={2} key={card.label}>
            <KpiCard {...card} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
