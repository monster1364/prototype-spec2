"use client"

import { Box, Chip, Grid, Paper, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material"
import { ChartContainer } from "@mui/x-charts/ChartContainer"
import { BarPlot } from "@mui/x-charts/BarChart"
import { LinePlot, MarkPlot } from "@mui/x-charts/LineChart"
import { ChartsXAxis } from "@mui/x-charts/ChartsXAxis"
import { ChartsYAxis } from "@mui/x-charts/ChartsYAxis"
import { ChartsTooltip } from "@mui/x-charts/ChartsTooltip"
import { ChartsGrid } from "@mui/x-charts/ChartsGrid"
import type { TrafficWeeklyItem, ConversionFunnelData } from "../models/types"
import { TABLE_HEADER_CELL_SX as hStyle } from "../modules/constants"

interface Props {
  data: TrafficWeeklyItem[]
  funnelData: ConversionFunnelData
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

export function TrafficAnalysis({ data, funnelData }: Props) {
  return (
    <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 1.5, mb: 2.5 }}>
      <Stack direction="row" alignItems="center" gap={1} mb={2}>
        <Typography variant="subtitle2" fontWeight={700} fontSize={13}>트래픽 & 전환 분석</Typography>
        <Chip label="GA4 연동 필요" size="small" sx={{ fontSize: 11, bgcolor: '#f1f5f9', color: '#475569', fontWeight: 600 }} />
        <Typography variant="caption" color="text.secondary" fontSize={11}>주차(CW) 기준 · 런칭~현재</Typography>
      </Stack>

      {/* 전환 퍼널 */}
      <ConversionFunnel data={funnelData} />

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

      {/* 채널별 전환율 요약 */}
      <ChannelConversionSummary data={data} />
    </Paper>
  )
}

// ── 전환 퍼널 ────────────────────────────────────────────────────

const FUNNEL_STEPS = [
  { key: 'sessions',            label: '방문',        sub: '총 세션',         color: '#1976d2' },
  { key: 'productViewSessions', label: '상품 조회',   sub: 'PDP 진입 세션',  color: '#0288d1' },
  { key: 'cartAddSessions',     label: '장바구니',    sub: '추가 세션',       color: '#7c3aed' },
  { key: 'purchases',           label: '구매 완료',   sub: '주문 건수',       color: '#15803d' },
] as const

function ConversionFunnel({ data }: { data: ConversionFunnelData }) {
  const steps = FUNNEL_STEPS.map((s, i) => {
    const value    = data[s.key]
    const dropRate = i === 0 ? null : ((data[FUNNEL_STEPS[i - 1].key] - value) / data[FUNNEL_STEPS[i - 1].key]) * 100
    const pctOfTop = (value / data.sessions) * 100
    return { ...s, value, dropRate, pctOfTop }
  })

  const insights: Record<string, string> = {
    productViewSessions: steps[1].pctOfTop < 60  ? '상품 노출 개선 필요' : '상품 탐색 양호',
    cartAddSessions:     steps[2].pctOfTop < 5   ? '상세페이지 CTA 점검' : '장바구니 유입 양호',
    purchases:           steps[3].pctOfTop < 1.5 ? '장바구니 이탈 개선 필요' : '전환율 양호',
  }

  return (
    <Box sx={{ mb: 2.5, pb: 2.5, borderBottom: '1px solid', borderColor: 'divider' }}>
      <Stack direction="row" alignItems="center" gap={1} mb={1.5}>
        <Typography fontSize={12} fontWeight={600} color="text.secondary">전환 퍼널</Typography>
        <Typography fontSize={11} color="text.disabled">W36~W44 누적 · GA4 연동 필요</Typography>
      </Stack>
      <Grid container spacing={0}>
        {steps.map((step, i) => (
          <Grid key={step.key} size={3}>
            <Stack direction="row" alignItems="stretch">
              <Box sx={{ flex: 1 }}>
                {/* 드롭률 */}
                <Box sx={{ height: 20, display: 'flex', alignItems: 'center', mb: 0.5 }}>
                  {step.dropRate !== null && (
                    <Stack direction="row" alignItems="center" gap={0.5}>
                      <Typography fontSize={11} fontWeight={700} color={step.dropRate >= 80 ? 'error.main' : step.dropRate >= 50 ? 'warning.main' : 'text.secondary'}>
                        -{step.dropRate.toFixed(0)}%
                      </Typography>
                      {step.dropRate >= 80 && (
                        <Typography fontSize={10} color="error.main">▲ 최대 이탈</Typography>
                      )}
                    </Stack>
                  )}
                </Box>
                {/* 바 */}
                <Box sx={{ height: 10, bgcolor: 'grey.100', borderRadius: 1, overflow: 'hidden', mr: i < 3 ? 1 : 0 }}>
                  <Box sx={{ height: '100%', width: `${step.pctOfTop}%`, bgcolor: step.color, borderRadius: 1 }} />
                </Box>
                {/* 수치 */}
                <Box sx={{ mt: 0.75 }}>
                  <Typography fontSize={13} fontWeight={700} sx={{ color: step.color }}>
                    {step.value.toLocaleString()}
                  </Typography>
                  <Stack direction="row" alignItems="center" gap={0.5}>
                    <Typography fontSize={11} fontWeight={600} color="text.secondary">{step.label}</Typography>
                    <Typography fontSize={10} color="text.disabled">{step.pctOfTop.toFixed(1)}%</Typography>
                  </Stack>
                  <Typography fontSize={10} color="text.disabled">{step.sub}</Typography>
                  {step.key !== 'sessions' && (
                    <Typography fontSize={10} color={step.dropRate !== null && step.dropRate >= 80 ? 'error.main' : 'text.disabled'} mt={0.25}>
                      {insights[step.key]}
                    </Typography>
                  )}
                </Box>
              </Box>
              {i < 3 && (
                <Box sx={{ display: 'flex', alignItems: 'center', px: 0.5, color: 'text.disabled', fontSize: 16 }}>→</Box>
              )}
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

// ── 채널별 전환율 요약 ────────────────────────────────────────────

const CONV_RATE_KEYS: Record<typeof channels[number], keyof TrafficWeeklyItem> = {
  paidSocial:    'paidSocialConvRate',
  direct:        'directConvRate',
  search:        'searchConvRate',
  organicSocial: 'organicSocialConvRate',
}

function ChannelConversionSummary({ data }: { data: TrafficWeeklyItem[] }) {
  const overallAvg = data.reduce((sum, d) => sum + d.total * d.conversionRate, 0)
    / data.reduce((sum, d) => sum + d.total, 0)

  const channelStats = channels.map((ch) => {
    const totalSessions = data.reduce((sum, d) => sum + d[ch], 0)
    const weightedConv  = data.reduce((sum, d) => sum + d[ch] * (d[CONV_RATE_KEYS[ch]] as number), 0)
    const avgConvRate   = totalSessions > 0 ? weightedConv / totalSessions : 0
    return { ch, avgConvRate, diff: avgConvRate - overallAvg, totalSessions }
  })

  const maxConv = Math.max(...channelStats.map((s) => s.avgConvRate))

  return (
    <Box sx={{ mt: 2.5, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
      <Stack direction="row" alignItems="center" gap={1} mb={1.5}>
        <Typography fontSize={12} fontWeight={600} color="text.secondary">채널별 전환율 비교</Typography>
        <Typography fontSize={11} color="text.disabled">(기간 전체 · 세션 가중평균)</Typography>
        <Typography fontSize={11} color="text.disabled">전체 평균 {overallAvg.toFixed(1)}%</Typography>
      </Stack>
      <Stack spacing={1.2}>
        {channelStats.map(({ ch, avgConvRate, diff, totalSessions }) => {
          const isLow  = avgConvRate < 0.8
          const isHigh = avgConvRate >= 2.0
          const barColor = isLow ? '#ef4444' : isHigh ? '#16a34a' : '#3b82f6'
          const insight  = isLow
            ? '전환 효율 낮음 · 소재/랜딩 점검 필요'
            : isHigh
            ? '전환 효율 높음 · 예산 확대 검토'
            : '평균 수준'

          return (
            <Box key={ch}>
              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={0.4}>
                <Stack direction="row" alignItems="center" gap={1}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: CHANNEL_COLORS[ch] }} />
                  <Typography fontSize={12} fontWeight={500}>{CHANNEL_LABELS[ch]}</Typography>
                  <Typography fontSize={11} color="text.disabled">{totalSessions.toLocaleString()}세션</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" gap={1.5}>
                  <Typography fontSize={11} color={diff >= 0 ? '#16a34a' : '#ef4444'} fontWeight={600}>
                    {diff >= 0 ? '+' : ''}{diff.toFixed(1)}%p
                  </Typography>
                  <Typography fontSize={12} fontWeight={700} sx={{ color: barColor, minWidth: 32, textAlign: 'right' }}>
                    {avgConvRate.toFixed(1)}%
                  </Typography>
                  <Typography fontSize={11} color="text.disabled" sx={{ minWidth: 170 }}>{insight}</Typography>
                </Stack>
              </Stack>
              <Box sx={{ height: 6, bgcolor: 'grey.100', borderRadius: 1, overflow: 'hidden' }}>
                <Box sx={{ height: '100%', width: `${(avgConvRate / maxConv) * 100}%`, bgcolor: barColor, borderRadius: 1 }} />
              </Box>
            </Box>
          )
        })}
      </Stack>
    </Box>
  )
}
