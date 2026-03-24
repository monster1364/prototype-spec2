"use client"

import { Box, Chip, Paper, Stack, Typography } from "@mui/material"
import { LineChart } from "@mui/x-charts/LineChart"
import type { SalesTrendItem, PeriodUnit } from "../models/types"
import { CHART_PRIMARY_COLOR, CHART_PREV_YEAR_COLOR } from "../modules/constants"
import { formatRevenueShort } from "../modules/utils"

interface Props {
  data: SalesTrendItem[]
  periodUnit: PeriodUnit
}

export function SalesTrend({ data, periodUnit }: Props) {
  if (data.length === 0) return null

  const periodLabel = periodUnit === 'daily' ? '일별' : '월별'

  return (
    <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 1.5, mb: 2.5 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
        <Stack direction="row" alignItems="center" gap={1}>
          <Typography variant="subtitle2" fontWeight={700} fontSize={13}>
            매출 추이
            <Typography component="span" variant="caption" color="text.secondary" ml={0.5}>({periodLabel})</Typography>
          </Typography>
          <Chip label="매출 연동 필요" size="small" sx={{ fontSize: 11, bgcolor: '#f1f5f9', color: '#475569', fontWeight: 600 }} />
        </Stack>
        <Stack direction="row" gap={2}>
          <Stack direction="row" alignItems="center" gap={0.5}>
            <Box sx={{ width: 20, height: 2, bgcolor: CHART_PRIMARY_COLOR, borderRadius: 1 }} />
            <Typography variant="caption" fontSize={11} color="text.secondary">이번 기간</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" gap={0.5}>
            <Box sx={{ width: 20, height: 2, bgcolor: CHART_PREV_YEAR_COLOR, borderRadius: 1 }} />
            <Typography variant="caption" fontSize={11} color="text.secondary">전년 동기</Typography>
          </Stack>
        </Stack>
      </Stack>

      <LineChart
        height={200}
        series={[
          {
            data: data.map((d) => d.revenue),
            label: "이번 기간",
            color: CHART_PRIMARY_COLOR,
            showMark: false,
            valueFormatter: (v) => v ? formatRevenueShort(v) : "-",
          },
          {
            data: data.map((d) => d.revenuePrevYear),
            label: "전년 동기",
            color: CHART_PREV_YEAR_COLOR,
            showMark: false,
            valueFormatter: (v) => v ? formatRevenueShort(v) : "-",
          },
        ]}
        xAxis={[{
          scaleType: "point",
          data: data.map((d) => d.label),
          tickLabelStyle: { fontSize: 11, fill: "#9e9e9e" },
        }]}
        yAxis={[{
          valueFormatter: (v: number) => formatRevenueShort(v),
          tickLabelStyle: { fontSize: 11, fill: "#9e9e9e" },
        }]}
        sx={{
          "& .MuiLineElement-root": { strokeWidth: 2 },
          "& .MuiChartsAxis-line": { stroke: "#f0f0f0" },
          "& .MuiChartsAxis-tick": { stroke: "#f0f0f0" },
          "& .MuiChartsLegend-root": { display: "none" },
        }}
        margin={{ top: 10, right: 16, bottom: 28, left: 60 }}
      />
    </Paper>
  )
}
