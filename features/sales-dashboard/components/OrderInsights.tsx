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
import StorefrontIcon from '@mui/icons-material/Storefront'
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard'
import type { BestsellerItem, OrderPatternData } from '../models/types'

interface Props {
  bestsellers: BestsellerItem[]
  orderPattern: OrderPatternData
}

export function OrderInsights({ bestsellers, orderPattern }: Props) {
  const maxOrders = bestsellers[0]?.orderCount ?? 1
  const totalOrders = orderPattern.giftCount + orderPattern.normalCount

  return (
    <Paper variant="outlined" sx={{ p: 2.5, mb: 2.5 }}>
      {/* 헤더 */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Typography fontWeight={700} fontSize={15}>주문 인사이트</Typography>
        <Chip label="매출 연동 필요" size="small" sx={{ fontSize: 11, bgcolor: '#fef3c7', color: '#92400e', fontWeight: 600 }} />
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 2.5 }}>

        {/* 좌: 베스트셀러 TOP 10 */}
        <Box>
          <Typography fontSize={13} fontWeight={600} color="text.secondary" mb={1}>
            베스트셀러 TOP 10
          </Typography>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ bgcolor: 'grey.50' }}>
                  <TableCell sx={{ fontSize: 11, fontWeight: 700, width: 36, py: 1 }}>#</TableCell>
                  <TableCell sx={{ fontSize: 11, fontWeight: 700, py: 1 }}>상품명</TableCell>
                  <TableCell sx={{ fontSize: 11, fontWeight: 700, py: 1 }}>주문 건수</TableCell>
                  <TableCell sx={{ fontSize: 11, fontWeight: 700, py: 1 }}>취소 건수</TableCell>
                  <TableCell sx={{ fontSize: 11, fontWeight: 700, py: 1 }}>취소율</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bestsellers.map((item) => (
                  <TableRow key={item.rank} hover>
                    <TableCell sx={{ fontSize: 12, py: 0.8, color: 'text.secondary' }}>
                      {item.rank}
                    </TableCell>
                    <TableCell sx={{ py: 0.8 }}>
                      <Box>
                        <Typography fontSize={12} fontWeight={500}>{item.productName}</Typography>
                        {/* 주문 건수 bar */}
                        <Box sx={{ mt: 0.4, height: 4, bgcolor: 'grey.100', borderRadius: 1, overflow: 'hidden' }}>
                          <Box
                            sx={{
                              height: '100%',
                              width: `${(item.orderCount / maxOrders) * 100}%`,
                              bgcolor: '#1976d2',
                              borderRadius: 1,
                            }}
                          />
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ fontSize: 12, py: 0.8, fontWeight: 600 }}>
                      {item.orderCount.toLocaleString()}건
                    </TableCell>
                    <TableCell sx={{ fontSize: 12, py: 0.8, color: 'text.secondary' }}>
                      {item.cancelCount}건
                    </TableCell>
                    <TableCell sx={{ py: 0.8 }}>
                      <Typography
                        fontSize={12}
                        fontWeight={600}
                        color={item.cancelRate >= 30 ? 'error.main' : item.cancelRate >= 20 ? 'warning.main' : 'text.secondary'}
                      >
                        {item.cancelRate.toFixed(1)}%
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Typography fontSize={11} color="text.disabled" mt={1}>
            * 취소율 30% 이상(빨간) → MD 이슈 확인 필요
          </Typography>
        </Box>

        {/* 우: 기프트 비율 + 취소 원인 */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>

          {/* 기프트 vs 일반 주문 */}
          <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1.5, p: 2 }}>
            <Typography fontSize={13} fontWeight={600} color="text.secondary" mb={1.5}>
              기프트 vs 일반 주문
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 1.5 }}>
              <Box sx={{
                flex: orderPattern.normalCount,
                bgcolor: '#1976d2',
                height: 28,
                borderRadius: '6px 0 0 6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Typography fontSize={11} fontWeight={700} color="white">
                  일반 {(100 - orderPattern.giftRatio).toFixed(1)}%
                </Typography>
              </Box>
              <Box sx={{
                flex: orderPattern.giftCount,
                bgcolor: '#7c3aed',
                height: 28,
                borderRadius: '0 6px 6px 0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Typography fontSize={11} fontWeight={700} color="white">
                  🎁 {orderPattern.giftRatio.toFixed(1)}%
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <StorefrontIcon sx={{ fontSize: 14, color: '#1976d2' }} />
                <Typography fontSize={12} color="text.secondary">
                  일반 <strong>{orderPattern.normalCount.toLocaleString()}건</strong>
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <CardGiftcardIcon sx={{ fontSize: 14, color: '#7c3aed' }} />
                <Typography fontSize={12} color="text.secondary">
                  기프트 <strong>{orderPattern.giftCount.toLocaleString()}건</strong>
                </Typography>
              </Box>
            </Box>
            <Typography fontSize={11} color="text.disabled" mt={1}>
              전체 {totalOrders.toLocaleString()}건 기준
            </Typography>
          </Box>

          {/* 취소 원인 */}
          <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1.5, p: 2, flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
              <Typography fontSize={13} fontWeight={600} color="text.secondary">
                취소 원인 분석
              </Typography>
              <Typography fontSize={11} color="error.main" fontWeight={600}>
                총 {orderPattern.cancelCount}건 ({orderPattern.cancelRate}%)
              </Typography>
            </Box>
            {orderPattern.cancelReasons.map((r) => (
              <Box key={r.reason} sx={{ mb: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.3 }}>
                  <Typography fontSize={12}>{r.reason}</Typography>
                  <Typography fontSize={12} color="text.secondary">{r.count}건</Typography>
                </Box>
                <Box sx={{ height: 6, bgcolor: 'grey.100', borderRadius: 1, overflow: 'hidden' }}>
                  <Box
                    sx={{
                      height: '100%',
                      width: `${r.ratio}%`,
                      bgcolor: r.reason === '재고 부족' ? '#ea580c' : '#94a3b8',
                      borderRadius: 1,
                    }}
                  />
                </Box>
                <Typography fontSize={10} color="text.disabled" textAlign="right">{r.ratio}%</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Paper>
  )
}
