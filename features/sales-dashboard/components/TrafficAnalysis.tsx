"use client"

import { Box, Chip, Grid, Paper, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material"
import { ChartContainer } from "@mui/x-charts/ChartContainer"
import { BarPlot } from "@mui/x-charts/BarChart"
import { LinePlot, MarkPlot } from "@mui/x-charts/LineChart"
import { ChartsXAxis } from "@mui/x-charts/ChartsXAxis"
import { ChartsYAxis } from "@mui/x-charts/ChartsYAxis"
import { ChartsTooltip } from "@mui/x-charts/ChartsTooltip"
import { ChartsGrid } from "@mui/x-charts/ChartsGrid"
import type { TrafficWeeklyItem } from "../models/types"
import { TABLE_HEADER_CELL_SX as hStyle } from "../modules/constants"

interface Props {
  data: TrafficWeeklyItem[]
}

const CHANNEL_COLORS = {
  paidSocial:    '#16a34a',
  direct:        '#f59e0b',
  search:        '#ef4444',
  organicSocial: '#3b82f6',
}
const CHANNEL_LABELS = {
  paidSocial:    'Paid Social',
  direct:        'Direct',
  search:        'Search (Naver+Google)',
  organicSocial: 'Organic Social (IG)',
}

const channels = ['paidSocial', 'direct', 'search', 'organicSocial'] as const

export function TrafficAnalysis({ data }: Props) {
  return (
    <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 1.5, mb: 2.5 }}>
      <Stack direction="row" alignItems="center" gap={1} mb={2}>
        <Typography variant="subtitle2" fontWeight={700} fontSize={13}>트래픽 & 전환 분석</Typography>
        <Chip label="GA4 연동 필요" size="small" sx={{ fontSize: 11, bgcolor: '#f1f5f9', color: '#475569', fontWeight: 600 }} />
        <Typography variant="caption" color="text.secondary" fontSize={11}>주차(CW) 기준 · 런칭~현재</Typography>
      </Stack>

      <Grid container spacing={2.5}>
        {/* 좌: 스택 바 + 전환율 라인 */}
        <Grid size={7}>
          <Typography fontSize={12} fontWeight={600} color="text.secondary" mb={0.5}>유입 경로별 트래픽 (주차별)</Typography>

          {/* 범례 */}
          <Stack direction="row" gap={2} mb={1} flexWrap="wrap">
            {channels.map((ch) => (
              <Stack key={ch} direction="row" alignItems="center" gap={0.5}>
                <Box sx={{ width: 10, height: 10, bgcolor: CHANNEL_COLORS[ch], borderRadius: 0.5 }} />
                <Typography fontSize={10} color="text.secondary">{CHANNEL_LABELS[ch]}</Typography>
              </Stack>
            ))}
            <Stack direction="row" alignItems="center" gap={0.5}>
              <Box sx={{ width: 16, height: 2, bgcolor: '#7c3aed', borderRadius: 1 }} />
              <Typography fontSize={10} color="#7c3aed">전환율</Typography>
            </Stack>
          </Stack>

          <ChartContainer
            height={220}
            series={[
              ...channels.map((ch) => ({
                type: 'bar' as const,
                data: data.map((d) => d[ch]),
                label: CHANNEL_LABELS[ch],
                color: CHANNEL_COLORS[ch],
                stack: 'traffic',
                yAxisId: 'traffic',
              })),
              {
                type: 'line' as const,
                data: data.map((d) => d.conversionRate),
                label: '전환율',
                color: '#7c3aed',
                yAxisId: 'conv',
                showMark: true,
                valueFormatter: (v: number | null) => v !== null ? `${v.toFixed(1)}%` : '-',
              },
            ]}
            xAxis={[{
              id: 'x',
              scaleType: 'band',
              data: data.map((d) => d.week),
              tickLabelStyle: { fontSize: 11, fill: '#9e9e9e' },
            }]}
            yAxis={[
              { id: 'traffic', scaleType: 'linear', tickLabelStyle: { fontSize: 11, fill: '#9e9e9e' } },
              { id: 'conv',    scaleType: 'linear', position: 'right', tickLabelStyle: { fontSize: 11, fill: '#7c3aed' } },
            ]}
            sx={{
              "& .MuiChartsAxis-line": { stroke: "#f0f0f0" },
              "& .MuiChartsAxis-tick": { stroke: "#f0f0f0" },
              "& .MuiChartsLegend-root": { display: "none" },
            }}
            margin={{ top: 10, right: 48, bottom: 28, left: 48 }}
          >
            <ChartsGrid horizontal />
            <BarPlot borderRadius={3} />
            <LinePlot />
            <MarkPlot />
            <ChartsXAxis />
            <ChartsYAxis axisId="traffic" />
            <ChartsYAxis axisId="conv" />
            <ChartsTooltip />
          </ChartContainer>
        </Grid>

        {/* 우: 트래픽 품질 테이블 */}
        <Grid size={5}>
          <Typography fontSize={12} fontWeight={600} color="text.secondary" mb={1}>트래픽 품질</Typography>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ bgcolor: 'grey.50' }}>
                <TableCell sx={hStyle}>주차</TableCell>
                <TableCell align="right" sx={hStyle}>트래픽</TableCell>
                <TableCell align="right" sx={hStyle}>인당 조회</TableCell>
                <TableCell align="right" sx={{ ...hStyle, color: '#7c3aed' }}>전환율</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((d) => {
                const isHighConv = d.conversionRate >= 1.5
                return (
                  <TableRow key={d.week} hover>
                    <TableCell sx={{ fontSize: 12, fontWeight: 600, color: 'text.secondary' }}>{d.week}</TableCell>
                    <TableCell align="right" sx={{ fontSize: 12 }}>{d.total.toLocaleString()}</TableCell>
                    <TableCell align="right" sx={{ fontSize: 12, color: 'text.secondary' }}>{d.itemViewsPerSession.toFixed(1)}</TableCell>
                    <TableCell align="right">
                      <Typography fontSize={12} fontWeight={isHighConv ? 700 : 400} color={isHighConv ? '#7c3aed' : 'text.primary'}>
                        {d.conversionRate.toFixed(1)}%
                      </Typography>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </Paper>
  )
}

