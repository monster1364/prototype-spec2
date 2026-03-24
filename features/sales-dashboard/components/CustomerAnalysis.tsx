"use client"

import { useState } from "react"
import {
  Box, Chip, Grid, Paper, Stack, Tab, Table, TableBody, TableCell,
  TableHead, TableRow, Tabs, Typography,
} from "@mui/material"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import FavoriteIcon from "@mui/icons-material/Favorite"
import type { CustomerAnalysisData } from "../models/types"
import { TABLE_HEADER_CELL_SX as hStyle } from "../modules/constants"
import { describeArc, ratiosToAngles, formatRatio } from "../modules/utils"

interface Props {
  data: CustomerAnalysisData
}

const CX = 70, CY = 70, R = 52, SW = 18
const COLORS = { new: '#1976d2', repeat: '#7b1fa2' }

export function CustomerAnalysis({ data }: Props) {
  const [tab, setTab] = useState<'cart' | 'wishlist'>('cart')
  const angles = ratiosToAngles([data.newCustomers, data.repeatCustomers])

  return (
    <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 1.5, mb: 2.5 }}>
      <Stack direction="row" alignItems="center" gap={1} mb={2}>
        <Typography variant="subtitle2" fontWeight={700} fontSize={13}>고객 분석</Typography>
        <Chip label="연동 필요 · CRM" size="small" sx={{ fontSize: 11, bgcolor: '#f1f5f9', color: '#475569', fontWeight: 600 }} />
      </Stack>

      <Grid container spacing={3}>
        {/* 좌: 신규/재구매 도넛 */}
        <Grid size={3}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <Box sx={{ position: "relative", display: "inline-block" }}>
              <Box component="svg" viewBox="0 0 140 140" sx={{ width: 140, height: 140 }}>
                <circle cx={CX} cy={CY} r={R} fill="none" stroke="#f0f0f0" strokeWidth={SW} />
                <path d={describeArc(CX, CY, R, angles[0].start, angles[0].end)}
                  fill="none" stroke={COLORS.new} strokeWidth={SW} strokeLinecap="round" />
                <path d={describeArc(CX, CY, R, angles[1].start, angles[1].end)}
                  fill="none" stroke={COLORS.repeat} strokeWidth={SW} strokeLinecap="round" />
              </Box>
              <Box sx={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <Typography variant="caption" color="text.secondary" fontSize={10}>총 고객</Typography>
                <Typography variant="body2" fontWeight={700} fontSize={14}>{data.totalCustomers.toLocaleString()}</Typography>
                <Typography variant="caption" color="text.disabled" fontSize={10}>명</Typography>
              </Box>
            </Box>

            <Stack spacing={1.5} sx={{ width: '100%' }}>
              {[
                { label: "신규 고객",   value: data.newCustomers,    ratio: data.newRatio,    color: COLORS.new },
                { label: "재구매 고객", value: data.repeatCustomers, ratio: data.repeatRatio, color: COLORS.repeat },
              ].map((item) => (
                <Stack key={item.label} direction="row" alignItems="center" gap={1}>
                  <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: item.color, flexShrink: 0 }} />
                  <Box>
                    <Typography variant="caption" color="text.secondary" fontSize={11}>{item.label}</Typography>
                    <Stack direction="row" alignItems="baseline" gap={0.5}>
                      <Typography fontWeight={700} fontSize={15}>{item.value.toLocaleString()}</Typography>
                      <Typography variant="caption" color="text.secondary" fontSize={11}>명</Typography>
                      <Typography variant="caption" fontWeight={700} fontSize={12} sx={{ color: item.color }}>
                        {formatRatio(item.ratio)}
                      </Typography>
                    </Stack>
                  </Box>
                </Stack>
              ))}
            </Stack>
          </Box>
        </Grid>

        {/* 우: 장바구니 / 위시리스트 탭 테이블 */}
        <Grid size={9}>
          {/* 탭 헤더 + 합계 */}
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
            <Tabs
              value={tab}
              onChange={(_, v) => setTab(v)}
              sx={{ minHeight: 32, "& .MuiTab-root": { minHeight: 32, py: 0, fontSize: 12, textTransform: "none", fontWeight: 600 } }}
            >
              <Tab
                icon={<ShoppingCartIcon sx={{ fontSize: 14 }} />}
                iconPosition="start"
                label={`장바구니 (${data.cartAddCount.toLocaleString()}건)`}
                value="cart"
              />
              <Tab
                icon={<FavoriteIcon sx={{ fontSize: 14 }} />}
                iconPosition="start"
                label={`위시리스트 (${data.wishlistAddCount.toLocaleString()}건)`}
                value="wishlist"
              />
            </Tabs>
          </Stack>

          {tab === 'cart' && (
            <>
              <Box sx={{ px: 1.5, py: 0.75, bgcolor: '#eff6ff', borderRadius: 1, mb: 1 }}>
                <Typography fontSize={11} color="#1d4ed8">
                  장바구니 전환율 낮은 상품 = 가격·상세페이지 개선 검토 / 높은 상품 = 재고 확보 우선
                </Typography>
              </Box>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ bgcolor: 'grey.50' }}>
                    <TableCell sx={hStyle}>순위</TableCell>
                    <TableCell sx={hStyle}>상품명</TableCell>
                    <TableCell sx={hStyle}>카테고리</TableCell>
                    <TableCell align="right" sx={hStyle}>장바구니 추가</TableCell>
                    <TableCell align="right" sx={{ ...hStyle, color: '#1976d2' }}>구매 전환율</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.cartItems.map((item, i) => {
                    const isHighConv = item.purchaseRate >= 40
                    const isLowConv  = item.purchaseRate < 15
                    return (
                      <TableRow key={item.productName} hover>
                        <TableCell sx={{ fontSize: 12, color: 'text.disabled', fontWeight: 600 }}>{i + 1}</TableCell>
                        <TableCell sx={{ fontSize: 13, fontWeight: 500 }}>{item.productName}</TableCell>
                        <TableCell sx={{ fontSize: 12, color: 'text.secondary' }}>{item.category}</TableCell>
                        <TableCell align="right" sx={{ fontSize: 12, fontWeight: 600 }}>
                          {item.cartCount.toLocaleString()}건
                        </TableCell>
                        <TableCell align="right">
                          <Chip
                            label={`${item.purchaseRate.toFixed(1)}%`}
                            size="small"
                            sx={{
                              height: 20, fontSize: 11, fontWeight: 700,
                              bgcolor: isHighConv ? '#dcfce7' : isLowConv ? '#fee2e2' : '#f1f5f9',
                              color:   isHighConv ? '#15803d' : isLowConv ? '#b91c1c' : '#475569',
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </>
          )}

          {tab === 'wishlist' && (
            <>
              <Box sx={{ px: 1.5, py: 0.75, bgcolor: '#fdf2f8', borderRadius: 1, mb: 1 }}>
                <Typography fontSize={11} color="#9d174d">
                  위시리스트 수 높고 재고 낮은 상품 = 재입고 우선순위 / 재고 충분하면 프로모션 트리거 검토
                </Typography>
              </Box>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ bgcolor: 'grey.50' }}>
                    <TableCell sx={hStyle}>순위</TableCell>
                    <TableCell sx={hStyle}>상품명</TableCell>
                    <TableCell sx={hStyle}>카테고리</TableCell>
                    <TableCell align="right" sx={{ ...hStyle, color: '#e91e63' }}>위시리스트</TableCell>
                    <TableCell align="right" sx={hStyle}>현재고</TableCell>
                    <TableCell align="right" sx={hStyle}>소진예상일</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.wishlistItems.map((item, i) => {
                    const isUrgent = item.daysToSellOut !== null && item.daysToSellOut <= 7
                    return (
                      <TableRow key={item.productName} hover>
                        <TableCell sx={{ fontSize: 12, color: 'text.disabled', fontWeight: 600 }}>{i + 1}</TableCell>
                        <TableCell sx={{ fontSize: 13, fontWeight: 500 }}>{item.productName}</TableCell>
                        <TableCell sx={{ fontSize: 12, color: 'text.secondary' }}>{item.category}</TableCell>
                        <TableCell align="right" sx={{ fontSize: 12, fontWeight: 700, color: '#e91e63' }}>
                          {item.wishlistCount.toLocaleString()}건
                        </TableCell>
                        <TableCell align="right" sx={{ fontSize: 12, color: isUrgent ? 'error.main' : 'text.primary', fontWeight: isUrgent ? 700 : 400 }}>
                          {item.currentStock.toLocaleString()}개
                        </TableCell>
                        <TableCell align="right">
                          {item.daysToSellOut === null
                            ? <Typography fontSize={12} color="text.disabled">—</Typography>
                            : <Typography fontSize={12} fontWeight={700} color={isUrgent ? 'error.main' : 'warning.main'}>
                                D-{item.daysToSellOut}
                              </Typography>
                          }
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </>
          )}
        </Grid>
      </Grid>
    </Paper>
  )
}

