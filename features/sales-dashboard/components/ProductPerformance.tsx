"use client"

import { useState } from "react"
import {
  Box, Chip, Paper, Stack, Tab, Table, TableBody, TableCell,
  TableHead, TableRow, Tabs, Tooltip, Typography,
} from "@mui/material"
import type { ProductPerformanceItem, ProductClassification } from "../models/types"
import { PRODUCT_CLASSIFICATION_LABEL, TABLE_HEADER_CELL_SX as hStyle } from "../modules/constants"
import { formatRevenue, formatRatio, getClassificationColor } from "../modules/utils"

interface Props {
  products: ProductPerformanceItem[]
}

type TabValue = 'all' | ProductClassification

export function ProductPerformance({ products }: Props) {
  const [tab, setTab] = useState<TabValue>('all')

  const filtered = (() => {
    if (tab === 'all') return [...products].sort((a, b) => b.revenue - a.revenue)
    if (tab === 'reorder') return products.filter((p) => p.classification === 'reorder').sort((a, b) => (b.demandSignal ?? 0) - (a.demandSignal ?? 0))
    return products.filter((p) => p.classification === 'slow_moving').sort((a, b) => (b.daysToSellOut ?? 0) - (a.daysToSellOut ?? 0))
  })()

  const reorderCount  = products.filter((p) => p.classification === 'reorder').length
  const slowMovCount  = products.filter((p) => p.classification === 'slow_moving').length

  return (
    <Paper variant="outlined" sx={{ borderRadius: 1.5, mb: 2.5, overflow: "hidden" }}>
      <Box sx={{ px: 2.5, pt: 2, borderBottom: "1px solid", borderColor: "divider" }}>
        <Stack direction="row" alignItems="center" gap={1} mb={1}>
          <Typography variant="subtitle2" fontWeight={700} fontSize={13}>상품 성과 Top {products.length}</Typography>
          <Chip label="연동 필요 · 매출·전환율·재고" size="small" sx={{ fontSize: 11, bgcolor: '#f1f5f9', color: '#475569', fontWeight: 600 }} />
        </Stack>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          sx={{ minHeight: 36, "& .MuiTab-root": { minHeight: 36, py: 0, fontSize: 13, textTransform: "none", fontWeight: 600 } }}
        >
          <Tab label={`전체 (${products.length})`} value="all" />
          <Tab
            label={
              <Box component="span" sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                재발주 필요
                <Chip label={reorderCount} size="small" color="success" sx={{ height: 18, fontSize: 11, fontWeight: 700 }} />
              </Box>
            }
            value="reorder"
          />
          <Tab
            label={
              <Box component="span" sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                소진 필요
                <Chip label={slowMovCount} size="small" color="error" sx={{ height: 18, fontSize: 11, fontWeight: 700 }} />
              </Box>
            }
            value="slow_moving"
          />
        </Tabs>
      </Box>

      {/* 탭별 안내 */}
      {tab === 'all' && (
        <Box sx={{ px: 2.5, py: 1, bgcolor: 'grey.50', borderBottom: '1px solid', borderColor: 'divider' }}>
          <Typography fontSize={12} color="text.secondary">정렬 기준: 매출 높은 순</Typography>
        </Box>
      )}
      {tab === 'reorder' && (
        <Box sx={{ px: 2.5, py: 1, bgcolor: '#f0fdf4', borderBottom: '1px solid', borderColor: 'divider' }}>
          <Typography fontSize={12} color="#15803d">
            정렬 기준: 수요 시그널 높은 순 &nbsp;·&nbsp; 수요 시그널 = 판매로스(품절로 못 판 수) + 입고알림 신청 수 합산
          </Typography>
        </Box>
      )}
      {tab === 'slow_moving' && (
        <Box sx={{ px: 2.5, py: 1, bgcolor: '#fef2f2', borderBottom: '1px solid', borderColor: 'divider' }}>
          <Typography fontSize={12} color="#b91c1c">
            정렬 기준: 소진예상일 먼 순 (재고 문제 심각한 상품 우선) &nbsp;·&nbsp; 소진 전략(프로모션·번들·단종) 검토 필요
          </Typography>
        </Box>
      )}

      <Table size="small">
        {tab === 'all' && <AllColumns />}
        {tab === 'reorder' && <ReorderColumns />}
        {tab === 'slow_moving' && <SlowMovingColumns />}
        <TableBody>
          {filtered.length === 0 ? (
            <TableRow>
              <TableCell colSpan={11} align="center" sx={{ py: 6, color: "text.disabled", fontSize: 13 }}>
                해당 분류의 상품이 없습니다.
              </TableCell>
            </TableRow>
          ) : tab === 'all' ? (
            filtered.map((p, i) => <AllRow key={p.rank} p={p} index={i + 1} />)
          ) : tab === 'reorder' ? (
            filtered.map((p, i) => <ReorderRow key={p.rank} p={p} index={i + 1} />)
          ) : (
            filtered.map((p, i) => <SlowMovingRow key={p.rank} p={p} index={i + 1} />)
          )}
        </TableBody>
      </Table>
    </Paper>
  )
}

// ── 전체 탭 ─────────────────────────────────────────────────────────
function AllColumns() {
  return (
    <TableHead>
      <TableRow sx={{ bgcolor: "grey.50" }}>
        <TableCell sx={hStyle}>순위</TableCell>
        <TableCell sx={hStyle}>상품명</TableCell>
        <TableCell sx={hStyle}>카테고리</TableCell>
        <TableCell align="right" sx={hStyle}>판매량</TableCell>
        <TableCell align="right" sx={hStyle}>판매 금액</TableCell>
        <TableCell align="right" sx={hStyle}>판매 속도</TableCell>
        <TableCell align="right" sx={hStyle}>전환율</TableCell>
        <TableCell align="right" sx={hStyle}>현재고</TableCell>
        <TableCell align="right" sx={hStyle}>소진율</TableCell>
        <TableCell align="right" sx={hStyle}>소진예상일</TableCell>
        <TableCell align="center" sx={hStyle}>분류</TableCell>
      </TableRow>
    </TableHead>
  )
}

function AllRow({ p, index }: { p: ProductPerformanceItem; index: number }) {
  return (
    <TableRow hover>
      <TableCell sx={{ fontSize: 12, color: "text.disabled", fontWeight: 600 }}>{index}</TableCell>
      <TableCell sx={{ fontSize: 13, fontWeight: 500 }}>{p.productName}</TableCell>
      <TableCell sx={{ fontSize: 12, color: "text.secondary" }}>{p.category}</TableCell>
      <TableCell align="right" sx={{ fontSize: 12 }}>{p.quantity.toLocaleString()}개</TableCell>
      <TableCell align="right" sx={{ fontSize: 12, fontWeight: 600 }}>{formatRevenue(p.revenue)}</TableCell>
      <TableCell align="right" sx={{ fontSize: 12, color: "text.secondary" }}>{p.salesVelocity.toFixed(1)}/일</TableCell>
      <TableCell align="right" sx={{ fontSize: 12 }}>{formatRatio(p.conversionRate)}</TableCell>
      <TableCell align="right" sx={{ fontSize: 12 }}>{p.currentStock.toLocaleString()}개</TableCell>
      <TableCell align="right" sx={{ fontSize: 12, color: p.sellThroughRate >= 80 ? "error.main" : "text.primary", fontWeight: p.sellThroughRate >= 80 ? 700 : 400 }}>
        {p.sellThroughRate.toFixed(1)}%
      </TableCell>
      <TableCell align="right" sx={{ fontSize: 12, color: p.daysToSellOut !== null && p.daysToSellOut <= 7 ? "error.main" : "text.secondary", fontWeight: p.daysToSellOut !== null && p.daysToSellOut <= 7 ? 700 : 400 }}>
        {p.daysToSellOut === null ? "—" : `D-${p.daysToSellOut}`}
      </TableCell>
      <TableCell align="center">
        <Chip
          label={PRODUCT_CLASSIFICATION_LABEL[p.classification]}
          size="small"
          color={getClassificationColor(p.classification)}
          sx={{ fontSize: 11, fontWeight: 700, height: 20 }}
        />
      </TableCell>
    </TableRow>
  )
}

// ── 재발주 필요 탭 ───────────────────────────────────────────────────
function ReorderColumns() {
  return (
    <TableHead>
      <TableRow sx={{ bgcolor: '#f0fdf4' }}>
        <TableCell sx={hStyle}>순위</TableCell>
        <TableCell sx={hStyle}>상품명</TableCell>
        <TableCell sx={hStyle}>카테고리</TableCell>
        <TableCell align="right" sx={hStyle}>판매 속도</TableCell>
        <TableCell align="right" sx={hStyle}>현재고</TableCell>
        <TableCell align="right" sx={hStyle}>소진예상일</TableCell>
        <TableCell align="right" sx={{ ...hStyle, color: '#15803d' }}>
          <Tooltip title="판매로스(품절로 못 판 수) + 입고알림 신청 수 합산">
            <span>수요 시그널 ⓘ</span>
          </Tooltip>
        </TableCell>
        <TableCell align="right" sx={hStyle}>판매 금액</TableCell>
      </TableRow>
    </TableHead>
  )
}

function ReorderRow({ p, index }: { p: ProductPerformanceItem; index: number }) {
  const urgent = p.daysToSellOut !== null && p.daysToSellOut <= 3
  return (
    <TableRow hover sx={{ bgcolor: urgent ? '#fef9c3' : undefined }}>
      <TableCell sx={{ fontSize: 12, color: "text.disabled", fontWeight: 600 }}>{index}</TableCell>
      <TableCell sx={{ fontSize: 13, fontWeight: 600 }}>
        <Stack direction="row" alignItems="center" gap={0.75}>
          {p.productName}
          {urgent && <Chip label="품절임박" size="small" color="warning" sx={{ height: 16, fontSize: 10, fontWeight: 700 }} />}
        </Stack>
      </TableCell>
      <TableCell sx={{ fontSize: 12, color: "text.secondary" }}>{p.category}</TableCell>
      <TableCell align="right" sx={{ fontSize: 12, fontWeight: 600, color: '#15803d' }}>{p.salesVelocity.toFixed(1)}/일</TableCell>
      <TableCell align="right" sx={{ fontSize: 12, color: p.currentStock <= 30 ? 'error.main' : 'text.primary', fontWeight: p.currentStock <= 30 ? 700 : 400 }}>
        {p.currentStock.toLocaleString()}개
      </TableCell>
      <TableCell align="right" sx={{ fontSize: 12, fontWeight: 700, color: p.daysToSellOut !== null && p.daysToSellOut <= 7 ? 'error.main' : '#d97706' }}>
        {p.daysToSellOut === null ? "—" : `D-${p.daysToSellOut}`}
      </TableCell>
      <TableCell align="right">
        <Typography fontSize={13} fontWeight={700} color="#15803d">
          {p.demandSignal?.toLocaleString() ?? '—'}
        </Typography>
      </TableCell>
      <TableCell align="right" sx={{ fontSize: 12, color: "text.secondary" }}>{formatRevenue(p.revenue)}</TableCell>
    </TableRow>
  )
}

// ── 소진 필요 탭 ─────────────────────────────────────────────────────
function SlowMovingColumns() {
  return (
    <TableHead>
      <TableRow sx={{ bgcolor: '#fef2f2' }}>
        <TableCell sx={hStyle}>순위</TableCell>
        <TableCell sx={hStyle}>상품명</TableCell>
        <TableCell sx={hStyle}>카테고리</TableCell>
        <TableCell align="right" sx={hStyle}>현재고</TableCell>
        <TableCell align="right" sx={hStyle}>판매 속도</TableCell>
        <TableCell align="right" sx={{ ...hStyle, color: '#b91c1c' }}>소진예상일</TableCell>
        <TableCell align="right" sx={hStyle}>온라인 판매</TableCell>
        <TableCell align="right" sx={hStyle}>오프라인 판매</TableCell>
        <TableCell align="right" sx={{ ...hStyle, color: '#b91c1c' }}>온/오프 갭</TableCell>
      </TableRow>
    </TableHead>
  )
}

function SlowMovingRow({ p, index }: { p: ProductPerformanceItem; index: number }) {
  const onlineSales = p.quantity
  const offlineSales = p.offlineSales ?? 0
  const gap = offlineSales > 0 ? ((onlineSales / offlineSales) * 100).toFixed(0) : null

  return (
    <TableRow hover>
      <TableCell sx={{ fontSize: 12, color: "text.disabled", fontWeight: 600 }}>{index}</TableCell>
      <TableCell sx={{ fontSize: 13, fontWeight: 600 }}>{p.productName}</TableCell>
      <TableCell sx={{ fontSize: 12, color: "text.secondary" }}>{p.category}</TableCell>
      <TableCell align="right" sx={{ fontSize: 12, fontWeight: 700, color: '#b91c1c' }}>
        {p.currentStock.toLocaleString()}개
      </TableCell>
      <TableCell align="right" sx={{ fontSize: 12, color: "text.secondary" }}>{p.salesVelocity.toFixed(1)}/일</TableCell>
      <TableCell align="right">
        <Tooltip title={`소진예상일: ${p.sellOutDate ?? '—'}`} placement="top">
          <Typography fontSize={12} fontWeight={700} color="#b91c1c" component="span">
            {p.sellOutDate ?? `D-${p.daysToSellOut}`}
          </Typography>
        </Tooltip>
      </TableCell>
      <TableCell align="right" sx={{ fontSize: 12 }}>{onlineSales.toLocaleString()}개</TableCell>
      <TableCell align="right" sx={{ fontSize: 12, color: "text.secondary" }}>
        {offlineSales > 0 ? `${offlineSales.toLocaleString()}개` : '—'}
      </TableCell>
      <TableCell align="right">
        {gap !== null ? (
          <Chip
            label={`온 ${gap}%`}
            size="small"
            color={Number(gap) < 20 ? 'error' : 'default'}
            sx={{ height: 18, fontSize: 11, fontWeight: 700 }}
          />
        ) : <Typography fontSize={12} color="text.disabled">—</Typography>}
      </TableCell>
    </TableRow>
  )
}

