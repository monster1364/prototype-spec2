"use client"

import {
  Box, Chip, Grid, LinearProgress, Paper, Stack,
  Table, TableBody, TableCell, TableHead, TableRow, Typography,
} from "@mui/material"
import { LineChart } from "@mui/x-charts/LineChart"
import type { CategorySales, CollectionSales, CollectionTrendSeries, PeriodUnit } from "../models/types"
import { CHART_PRIMARY_COLOR } from "../modules/constants"
import { formatRevenue, formatRevenueShort, formatDelta, getDeltaColor } from "../modules/utils"

interface Props {
  categories: CategorySales[]
  collections: CollectionSales[]
  collectionTrend: CollectionTrendSeries[]
  periodUnit: PeriodUnit
}

export function CategoryAnalysis({ categories, collections, collectionTrend, periodUnit }: Props) {
  const maxRevenue = categories.length > 0 ? Math.max(...categories.map((c) => c.revenue)) : 1
  const labels = collectionTrend[0]?.data.map((d) =>
    periodUnit === 'monthly' ? d.label.slice(5) + "월" : d.label
  ) ?? []

  return (
    <Box mb={2.5}>
      <Grid container spacing={2} mb={2}>
        {/* 카테고리별 판매 */}
        <Grid size={4}>
          <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 1.5, height: "100%" }}>
            <Stack direction="row" alignItems="center" gap={1} mb={2}>
              <Typography variant="subtitle2" fontWeight={700} fontSize={13}>카테고리별 판매</Typography>
              <Chip label="카테고리 매출 연동 필요" size="small" sx={{ fontSize: 11, bgcolor: '#f1f5f9', color: '#475569', fontWeight: 600 }} />
            </Stack>
            <Stack spacing={2}>
              {categories.map((cat) => (
                <Box key={cat.category}>
                  <Stack direction="row" alignItems="center" justifyContent="space-between" mb={0.5}>
                    <Typography variant="body2" fontSize={13} fontWeight={500}>{cat.category}</Typography>
                    <Stack direction="row" gap={1.5} alignItems="center">
                      <Typography variant="caption" color="text.secondary" fontSize={11}>
                        {cat.quantity.toLocaleString()}개
                      </Typography>
                      <Typography variant="caption" fontWeight={700} fontSize={12}>
                        {formatRevenueShort(cat.revenue)}
                      </Typography>
                    </Stack>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={(cat.revenue / maxRevenue) * 100}
                    sx={{
                      height: 8, borderRadius: 1, bgcolor: "#f0f0f0",
                      "& .MuiLinearProgress-bar": { bgcolor: CHART_PRIMARY_COLOR, borderRadius: 1 },
                    }}
                  />
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid>

        {/* 컬렉션 순위 + 추이 (통합) */}
        <Grid size={8}>
          <Paper variant="outlined" sx={{ borderRadius: 1.5, height: "100%", overflow: "hidden" }}>
            <Box sx={{ px: 2.5, py: 2, borderBottom: "1px solid", borderColor: "divider" }}>
              <Stack direction="row" alignItems="center" gap={1}>
                <Typography variant="subtitle2" fontWeight={700} fontSize={13}>컬렉션별 판매</Typography>
                <Chip label="컬렉션 매출 연동 필요" size="small" sx={{ fontSize: 11, bgcolor: '#f1f5f9', color: '#475569', fontWeight: 600 }} />
              </Stack>
            </Box>

            <Grid container sx={{ height: "calc(100% - 57px)" }}>
              {/* 좌: 순위 테이블 */}
              <Grid size={5} sx={{ borderRight: "1px solid", borderColor: "divider" }}>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ bgcolor: "grey.50" }}>
                      <TableCell sx={{ fontSize: 11, fontWeight: 700, width: 36, color: "text.secondary" }}>순위</TableCell>
                      <TableCell sx={{ fontSize: 11, fontWeight: 700, color: "text.secondary" }}>컬렉션</TableCell>
                      <TableCell align="right" sx={{ fontSize: 11, fontWeight: 700, color: "text.secondary" }}>매출</TableCell>
                      <TableCell align="right" sx={{ fontSize: 11, fontWeight: 700, color: "text.secondary" }}>증감</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {collections.map((col) => {
                      const color = collectionTrend.find((s) => s.collection === col.collection)?.color
                      return (
                        <TableRow key={col.rank} hover>
                          <TableCell sx={{ fontSize: 12, color: "text.disabled", fontWeight: 600 }}>{col.rank}</TableCell>
                          <TableCell>
                            <Stack direction="row" alignItems="center" gap={0.75}>
                              {color && <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: color, flexShrink: 0 }} />}
                              <Typography fontSize={12} fontWeight={500}>{col.collection}</Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="right" sx={{ fontSize: 12, fontWeight: 600 }}>{formatRevenueShort(col.revenue)}</TableCell>
                          <TableCell align="right">
                            <Typography fontSize={11} fontWeight={700} sx={{ color: getDeltaColor(col.deltaRate) }}>
                              {formatDelta(col.deltaRate)}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </Grid>

              {/* 우: 추이 차트 */}
              <Grid size={7} sx={{ p: 1.5, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <Typography fontSize={11} color="text.secondary" mb={0.5}>
                  판매 추이 ({periodUnit === 'daily' ? '일별' : '월별'})
                </Typography>
                <LineChart
                  height={240}
                  series={collectionTrend.map((s) => ({
                    data: s.data.map((d) => d.revenue),
                    label: s.collection,
                    color: s.color,
                    showMark: false,
                    valueFormatter: (v: number | null) => v ? formatRevenueShort(v) : "-",
                  }))}
                  xAxis={[{
                    scaleType: "point",
                    data: labels,
                    tickLabelStyle: { fontSize: 10, fill: "#9e9e9e" },
                  }]}
                  yAxis={[{
                    valueFormatter: (v: number) => formatRevenueShort(v),
                    tickLabelStyle: { fontSize: 10, fill: "#9e9e9e" },
                  }]}
                  sx={{
                    "& .MuiLineElement-root": { strokeWidth: 2 },
                    "& .MuiChartsAxis-line": { stroke: "#f0f0f0" },
                    "& .MuiChartsAxis-tick": { stroke: "#f0f0f0" },
                    "& .MuiChartsLegend-root": { display: "none" },
                  }}
                  margin={{ top: 8, right: 12, bottom: 28, left: 52 }}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
