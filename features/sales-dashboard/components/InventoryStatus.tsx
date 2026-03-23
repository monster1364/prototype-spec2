"use client"

import {
  Box, Chip, Grid, Paper, Stack, Table, TableBody, TableCell,
  TableHead, TableRow, Typography,
} from "@mui/material"
import type { SalesInventoryItem, InboundItem, DtcMtcSummary } from "../models/types"
import { formatRevenue, formatRevenueShort } from "../modules/utils"

interface Props {
  inventory: SalesInventoryItem[]
  inbound: InboundItem[]
  dtcMtc: DtcMtcSummary
}

export function InventoryStatus({ inventory, inbound, dtcMtc }: Props) {
  return (
    <Box sx={{ mb: 2.5 }}>
      {/* 섹션 헤더 */}
      <Stack direction="row" alignItems="center" gap={1} mb={1.5}>
        <Typography fontWeight={700} fontSize={14}>재고 · 입고 현황</Typography>
        <Chip label="연동 필요 · WMS/ERP" size="small" sx={{ fontSize: 11, bgcolor: '#f1f5f9', color: '#475569', fontWeight: 600 }} />
      </Stack>
      {/* DTC / MTC 카드 */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid size={6}>
          <Paper variant="outlined" sx={{ p: 2, borderRadius: 1.5 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography variant="caption" color="text.secondary" fontWeight={600} fontSize={11} sx={{ textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  DTC (자사몰)
                </Typography>
                <Typography variant="h6" fontWeight={700} fontSize={20} mt={0.5}>
                  {formatRevenueShort(dtcMtc.dtcRevenue)}
                </Typography>
                <Typography variant="caption" color="text.disabled" fontSize={11}>
                  {formatRevenue(dtcMtc.dtcRevenue)} · {dtcMtc.dtcOrderCount.toLocaleString()}건
                </Typography>
              </Box>
              <Box sx={{ textAlign: "right" }}>
                <Typography variant="h5" fontWeight={800} color="primary.main" fontSize={28}>
                  {dtcMtc.dtcRatio.toFixed(1)}%
                </Typography>
                <Typography variant="caption" color="text.secondary" fontSize={11}>전체 온라인 대비</Typography>
              </Box>
            </Stack>
          </Paper>
        </Grid>
        <Grid size={6}>
          <Paper variant="outlined" sx={{ p: 2, borderRadius: 1.5 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography variant="caption" color="text.secondary" fontWeight={600} fontSize={11} sx={{ textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  MTC (멀티채널)
                </Typography>
                <Typography variant="h6" fontWeight={700} fontSize={20} mt={0.5}>
                  {formatRevenueShort(dtcMtc.mtcRevenue)}
                </Typography>
                <Typography variant="caption" color="text.disabled" fontSize={11}>
                  {formatRevenue(dtcMtc.mtcRevenue)} · {dtcMtc.mtcOrderCount.toLocaleString()}건
                </Typography>
              </Box>
              <Box sx={{ textAlign: "right" }}>
                <Typography variant="h5" fontWeight={800} color="text.secondary" fontSize={28}>
                  {dtcMtc.mtcRatio.toFixed(1)}%
                </Typography>
                <Typography variant="caption" color="text.secondary" fontSize={11}>전체 온라인 대비</Typography>
              </Box>
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      {/* 소진 임박 + 입고 예정 */}
      <Grid container spacing={2}>
        <Grid size={6}>
          <Paper variant="outlined" sx={{ borderRadius: 1.5, overflow: "hidden" }}>
            <Box sx={{ px: 2.5, py: 1.5, borderBottom: "1px solid", borderColor: "divider", display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="subtitle2" fontWeight={700} fontSize={13}>
                소진 임박 상품
              </Typography>
              <Chip label="7일 이내" size="small" color="error" sx={{ height: 18, fontSize: 11, fontWeight: 700 }} />
            </Box>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ bgcolor: "grey.50" }}>
                  <TableCell sx={{ fontSize: 11, fontWeight: 700, color: "text.secondary" }}>상품명</TableCell>
                  <TableCell align="right" sx={{ fontSize: 11, fontWeight: 700, color: "text.secondary" }}>현재고</TableCell>
                  <TableCell align="right" sx={{ fontSize: 11, fontWeight: 700, color: "text.secondary" }}>소진율</TableCell>
                  <TableCell align="right" sx={{ fontSize: 11, fontWeight: 700, color: "text.secondary" }}>소진예상일</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {inventory.map((item) => (
                  <TableRow key={item.productName} hover>
                    <TableCell>
                      <Typography variant="body2" fontSize={12} fontWeight={500}>{item.productName}</Typography>
                      <Typography variant="caption" color="text.disabled" fontSize={11}>{item.category}</Typography>
                    </TableCell>
                    <TableCell align="right" sx={{ fontSize: 12 }}>{item.currentStock}개</TableCell>
                    <TableCell align="right" sx={{ fontSize: 12, fontWeight: 700, color: "error.main" }}>
                      {item.sellThroughRate.toFixed(1)}%
                    </TableCell>
                    <TableCell align="right" sx={{ fontSize: 12, fontWeight: 700, color: "error.main" }}>
                      {item.daysToSellOut}일
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>

        <Grid size={6}>
          <Paper variant="outlined" sx={{ borderRadius: 1.5, overflow: "hidden" }}>
            <Box sx={{ px: 2.5, py: 1.5, borderBottom: "1px solid", borderColor: "divider" }}>
              <Typography variant="subtitle2" fontWeight={700} fontSize={13}>
                입고 예정 현황
              </Typography>
            </Box>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ bgcolor: "grey.50" }}>
                  <TableCell sx={{ fontSize: 11, fontWeight: 700, color: "text.secondary" }}>상품명</TableCell>
                  <TableCell align="right" sx={{ fontSize: 11, fontWeight: 700, color: "text.secondary" }}>입고 수량</TableCell>
                  <TableCell align="right" sx={{ fontSize: 11, fontWeight: 700, color: "text.secondary" }}>예정일</TableCell>
                  <TableCell align="center" sx={{ fontSize: 11, fontWeight: 700, color: "text.secondary" }}>구분</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {inbound.map((item) => (
                  <TableRow key={item.productName + item.expectedDate} hover>
                    <TableCell>
                      <Typography variant="body2" fontSize={12} fontWeight={500}>{item.productName}</Typography>
                      <Typography variant="caption" color="text.disabled" fontSize={11}>{item.category}</Typography>
                    </TableCell>
                    <TableCell align="right" sx={{ fontSize: 12, fontWeight: 600 }}>{item.inboundQty.toLocaleString()}개</TableCell>
                    <TableCell align="right" sx={{ fontSize: 12, color: "text.secondary" }}>{item.expectedDate}</TableCell>
                    <TableCell align="center">
                      <Chip
                        label={item.inboundType === 'restock' ? '재입고' : '신규'}
                        size="small"
                        color={item.inboundType === 'restock' ? 'warning' : 'info'}
                        sx={{ height: 18, fontSize: 11, fontWeight: 700 }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
