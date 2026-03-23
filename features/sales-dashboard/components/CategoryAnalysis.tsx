"use client"

import {
  Box, Chip, Grid, LinearProgress, Paper, Stack,
  Table, TableBody, TableCell, TableHead, TableRow, Typography,
} from "@mui/material"
import type { CategorySales, CollectionSales } from "../models/types"
import { CHART_PRIMARY_COLOR } from "../modules/constants"
import { formatRevenue, formatRevenueShort, formatDelta, getDeltaColor } from "../modules/utils"

interface Props {
  categories: CategorySales[]
  collections: CollectionSales[]
}

export function CategoryAnalysis({ categories, collections }: Props) {
  const maxRevenue = Math.max(...categories.map((c) => c.revenue))

  return (
    <Grid container spacing={2} mb={2.5}>
      {/* 카테고리별 판매 Bar Chart */}
      <Grid size={5}>
        <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 1.5, height: "100%" }}>
          <Stack direction="row" alignItems="center" gap={1} mb={2}>
            <Typography variant="subtitle2" fontWeight={700} fontSize={13}>카테고리별 판매</Typography>
            <Chip label="일부 적용 · 건수 OMS 기반" size="small" sx={{ fontSize: 11, bgcolor: '#fef3c7', color: '#92400e', fontWeight: 600 }} />
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
                    height: 8,
                    borderRadius: 1,
                    bgcolor: "#f0f0f0",
                    "& .MuiLinearProgress-bar": { bgcolor: CHART_PRIMARY_COLOR, borderRadius: 1 },
                  }}
                />
              </Box>
            ))}
          </Stack>
        </Paper>
      </Grid>

      {/* 컬렉션 순위 테이블 */}
      <Grid size={7}>
        <Paper variant="outlined" sx={{ borderRadius: 1.5, height: "100%", overflow: "hidden" }}>
          <Box sx={{ px: 2.5, py: 2, borderBottom: "1px solid", borderColor: "divider" }}>
            <Stack direction="row" alignItems="center" gap={1}>
              <Typography variant="subtitle2" fontWeight={700} fontSize={13}>컬렉션별 판매 순위</Typography>
              <Chip label="일부 적용 · PIM 컬렉션 기반" size="small" sx={{ fontSize: 11, bgcolor: '#fef3c7', color: '#92400e', fontWeight: 600 }} />
            </Stack>
          </Box>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ bgcolor: "grey.50" }}>
                <TableCell sx={{ fontSize: 11, fontWeight: 700, width: 40, color: "text.secondary" }}>순위</TableCell>
                <TableCell sx={{ fontSize: 11, fontWeight: 700, color: "text.secondary" }}>컬렉션</TableCell>
                <TableCell align="right" sx={{ fontSize: 11, fontWeight: 700, color: "text.secondary" }}>판매 금액</TableCell>
                <TableCell align="right" sx={{ fontSize: 11, fontWeight: 700, color: "text.secondary" }}>판매량</TableCell>
                <TableCell align="right" sx={{ fontSize: 11, fontWeight: 700, color: "text.secondary" }}>전기간 대비</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {collections.map((col) => (
                <TableRow key={col.rank} hover>
                  <TableCell sx={{ fontSize: 12, color: "text.disabled", fontWeight: 600 }}>
                    {col.rank}
                  </TableCell>
                  <TableCell sx={{ fontSize: 13, fontWeight: 500 }}>{col.collection}</TableCell>
                  <TableCell align="right" sx={{ fontSize: 12, fontWeight: 600 }}>
                    {formatRevenue(col.revenue)}
                  </TableCell>
                  <TableCell align="right" sx={{ fontSize: 12, color: "text.secondary" }}>
                    {col.quantity.toLocaleString()}개
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="caption"
                      fontSize={12}
                      fontWeight={700}
                      sx={{ color: getDeltaColor(col.deltaRate) }}
                    >
                      {formatDelta(col.deltaRate)}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
    </Grid>
  )
}
