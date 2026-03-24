"use client"

import {
  Box, Chip, Grid, Paper, Stack, Table, TableBody, TableCell,
  TableHead, TableRow, Typography,
} from "@mui/material"
import type { InboundTrackingItem, DtcMtcSummary } from "../models/types"
import { formatRevenue, formatRevenueShort } from "../modules/utils"

const INBOUND_STATUS_LABEL: Record<InboundTrackingItem['status'], string> = {
  received: '입고 완료',
  partial:  '부분 입고',
  pending:  '예정',
  overdue:  '지연',
}
const INBOUND_STATUS_COLOR: Record<InboundTrackingItem['status'], string> = {
  received: '#16a34a',
  partial:  '#ea580c',
  pending:  '#475569',
  overdue:  '#dc2626',
}
const INBOUND_STATUS_BG: Record<InboundTrackingItem['status'], string> = {
  received: '#dcfce7',
  partial:  '#ffedd5',
  pending:  '#f1f5f9',
  overdue:  '#fee2e2',
}

interface Props {
  inboundTracking: InboundTrackingItem[]
  dtcMtc: DtcMtcSummary
}

export function InventoryStatus({ inboundTracking, dtcMtc }: Props) {
  const totalPlanned = inboundTracking.length
  const { receivedCount, partialCount, overdueCount, pendingCount } = inboundTracking.reduce(
    (acc, i) => {
      if (i.status === 'received') acc.receivedCount++
      else if (i.status === 'partial')  acc.partialCount++
      else if (i.status === 'overdue')  acc.overdueCount++
      else if (i.status === 'pending')  acc.pendingCount++
      return acc
    },
    { receivedCount: 0, partialCount: 0, overdueCount: 0, pendingCount: 0 },
  )

  return (
    <Box sx={{ mb: 2.5 }}>
      <Stack direction="row" alignItems="center" gap={1} mb={1.5}>
        <Typography fontWeight={700} fontSize={14}>재고 · 입고 현황</Typography>
        <Chip label="재고·소진율 WMS 연동 필요" size="small" sx={{ fontSize: 11, bgcolor: '#f1f5f9', color: '#475569', fontWeight: 600 }} />
      </Stack>

      {/* DTC / MTC */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid size={6}>
          <Paper variant="outlined" sx={{ p: 2, borderRadius: 1.5 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography variant="caption" color="text.secondary" fontWeight={600} fontSize={11} sx={{ textTransform: "uppercase", letterSpacing: "0.05em" }}>DTC (자사몰)</Typography>
                <Typography variant="h6" fontWeight={700} fontSize={20} mt={0.5}>{formatRevenueShort(dtcMtc.dtcRevenue)}</Typography>
                <Typography variant="caption" color="text.disabled" fontSize={11}>{formatRevenue(dtcMtc.dtcRevenue)} · {dtcMtc.dtcOrderCount.toLocaleString()}건</Typography>
              </Box>
              <Box sx={{ textAlign: "right" }}>
                <Typography variant="h5" fontWeight={800} color="primary.main" fontSize={28}>{dtcMtc.dtcRatio.toFixed(1)}%</Typography>
                <Typography variant="caption" color="text.secondary" fontSize={11}>전체 온라인 대비</Typography>
              </Box>
            </Stack>
          </Paper>
        </Grid>
        <Grid size={6}>
          <Paper variant="outlined" sx={{ p: 2, borderRadius: 1.5 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography variant="caption" color="text.secondary" fontWeight={600} fontSize={11} sx={{ textTransform: "uppercase", letterSpacing: "0.05em" }}>MTC (멀티채널)</Typography>
                <Typography variant="h6" fontWeight={700} fontSize={20} mt={0.5}>{formatRevenueShort(dtcMtc.mtcRevenue)}</Typography>
                <Typography variant="caption" color="text.disabled" fontSize={11}>{formatRevenue(dtcMtc.mtcRevenue)} · {dtcMtc.mtcOrderCount.toLocaleString()}건</Typography>
              </Box>
              <Box sx={{ textAlign: "right" }}>
                <Typography variant="h5" fontWeight={800} color="text.secondary" fontSize={28}>{dtcMtc.mtcRatio.toFixed(1)}%</Typography>
                <Typography variant="caption" color="text.secondary" fontSize={11}>전체 온라인 대비</Typography>
              </Box>
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      {/* 입고 추적 */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid size={12}>
          <Paper variant="outlined" sx={{ borderRadius: 1.5, overflow: "hidden" }}>
            <Box sx={{ px: 2.5, py: 1.5, borderBottom: "1px solid", borderColor: "divider" }}>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Stack direction="row" alignItems="center" gap={1}>
                  <Typography variant="subtitle2" fontWeight={700} fontSize={13}>입고율 / 미입고 현황</Typography>
                  <Chip label="연동 필요 · WMS" size="small" sx={{ fontSize: 11, bgcolor: '#f1f5f9', color: '#475569', fontWeight: 600 }} />
                </Stack>
              </Stack>
              {/* 요약 카운터 */}
              <Stack direction="row" gap={2} mt={1}>
                {[
                  { label: '예정', count: totalPlanned,  color: '#475569' },
                  { label: '완료', count: receivedCount, color: '#16a34a' },
                  { label: '부분', count: partialCount,  color: '#ea580c' },
                  { label: '지연', count: overdueCount,  color: '#dc2626' },
                  { label: '대기', count: pendingCount,  color: '#94a3b8' },
                ].map(({ label, count, color }) => (
                  <Box key={label} sx={{ textAlign: 'center' }}>
                    <Typography fontSize={16} fontWeight={700} sx={{ color }}>{count}</Typography>
                    <Typography fontSize={10} color="text.disabled">{label}</Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ bgcolor: "grey.50" }}>
                  <TableCell sx={{ fontSize: 11, fontWeight: 700, color: "text.secondary" }}>상품명</TableCell>
                  <TableCell align="right" sx={{ fontSize: 11, fontWeight: 700, color: "text.secondary" }}>예정/입고</TableCell>
                  <TableCell align="right" sx={{ fontSize: 11, fontWeight: 700, color: "text.secondary" }}>예정일</TableCell>
                  <TableCell align="center" sx={{ fontSize: 11, fontWeight: 700, color: "text.secondary" }}>상태</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {inboundTracking.map((item) => (
                  <TableRow key={item.productName + item.plannedDate} hover>
                    <TableCell>
                      <Typography fontSize={12} fontWeight={500}>{item.productName}</Typography>
                      <Typography variant="caption" color="text.disabled" fontSize={11}>{item.category}</Typography>
                    </TableCell>
                    <TableCell align="right" sx={{ fontSize: 12 }}>
                      <Typography component="span" fontWeight={700} fontSize={12} sx={{ color: INBOUND_STATUS_COLOR[item.status] }}>
                        {item.receivedQty}
                      </Typography>
                      <Typography component="span" fontSize={12} color="text.disabled"> / {item.plannedQty}개</Typography>
                    </TableCell>
                    <TableCell align="right" sx={{ fontSize: 12, color: item.status === 'overdue' ? 'error.main' : 'text.secondary' }}>
                      {item.plannedDate}
                    </TableCell>
                    <TableCell align="center">
                      <Box component="span" sx={{
                        fontSize: 11, fontWeight: 700, px: 0.8, py: 0.2, borderRadius: 0.8,
                        color: INBOUND_STATUS_COLOR[item.status],
                        bgcolor: INBOUND_STATUS_BG[item.status],
                        display: 'inline-block',
                      }}>
                        {INBOUND_STATUS_LABEL[item.status]}
                      </Box>
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
