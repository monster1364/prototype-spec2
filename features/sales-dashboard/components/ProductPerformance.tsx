"use client"

import { useState } from "react"
import {
  Box, Chip, Paper, Stack, Tab, Table, TableBody, TableCell,
  TableHead, TableRow, Tabs, Typography,
} from "@mui/material"
import type { ProductPerformanceItem, ProductClassification } from "../models/types"
import { PRODUCT_CLASSIFICATION_LABEL } from "../modules/constants"
import { formatRevenue, formatRatio, getClassificationColor } from "../modules/utils"

interface Props {
  products: ProductPerformanceItem[]
}

type TabValue = 'all' | ProductClassification

export function ProductPerformance({ products }: Props) {
  const [tab, setTab] = useState<TabValue>('all')

  const filtered = tab === 'all' ? products : products.filter((p) => p.classification === tab)

  const opportunityCount = products.filter((p) => p.classification === 'opportunity').length
  const riskCount = products.filter((p) => p.classification === 'risk').length

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
                기회 상품
                <Chip label={opportunityCount} size="small" color="success" sx={{ height: 18, fontSize: 11, fontWeight: 700 }} />
              </Box>
            }
            value="opportunity"
          />
          <Tab
            label={
              <Box component="span" sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                위험 상품
                <Chip label={riskCount} size="small" color="error" sx={{ height: 18, fontSize: 11, fontWeight: 700 }} />
              </Box>
            }
            value="risk"
          />
        </Tabs>
      </Box>

      <Table size="small">
        <TableHead>
          <TableRow sx={{ bgcolor: "grey.50" }}>
            <TableCell sx={{ fontSize: 11, fontWeight: 700, color: "text.secondary", width: 40 }}>순위</TableCell>
            <TableCell sx={{ fontSize: 11, fontWeight: 700, color: "text.secondary" }}>상품명</TableCell>
            <TableCell sx={{ fontSize: 11, fontWeight: 700, color: "text.secondary" }}>카테고리</TableCell>
            <TableCell align="right" sx={{ fontSize: 11, fontWeight: 700, color: "text.secondary" }}>판매량</TableCell>
            <TableCell align="right" sx={{ fontSize: 11, fontWeight: 700, color: "text.secondary" }}>판매 금액</TableCell>
            <TableCell align="right" sx={{ fontSize: 11, fontWeight: 700, color: "text.secondary" }}>판매 속도</TableCell>
            <TableCell align="right" sx={{ fontSize: 11, fontWeight: 700, color: "text.secondary" }}>전환율</TableCell>
            <TableCell align="right" sx={{ fontSize: 11, fontWeight: 700, color: "text.secondary" }}>현재고</TableCell>
            <TableCell align="right" sx={{ fontSize: 11, fontWeight: 700, color: "text.secondary" }}>소진율</TableCell>
            <TableCell align="right" sx={{ fontSize: 11, fontWeight: 700, color: "text.secondary" }}>소진예상일</TableCell>
            <TableCell align="center" sx={{ fontSize: 11, fontWeight: 700, color: "text.secondary" }}>분류</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.length === 0 ? (
            <TableRow>
              <TableCell colSpan={11} align="center" sx={{ py: 6, color: "text.disabled", fontSize: 13 }}>
                해당 분류의 상품이 없습니다.
              </TableCell>
            </TableRow>
          ) : (
            filtered.map((p) => (
              <TableRow key={p.rank} hover>
                <TableCell sx={{ fontSize: 12, color: "text.disabled", fontWeight: 600 }}>{p.rank}</TableCell>
                <TableCell sx={{ fontSize: 13, fontWeight: 500 }}>{p.productName}</TableCell>
                <TableCell sx={{ fontSize: 12, color: "text.secondary" }}>{p.category}</TableCell>
                <TableCell align="right" sx={{ fontSize: 12 }}>{p.quantity.toLocaleString()}개</TableCell>
                <TableCell align="right" sx={{ fontSize: 12, fontWeight: 600 }}>{formatRevenue(p.revenue)}</TableCell>
                <TableCell align="right" sx={{ fontSize: 12, color: "text.secondary" }}>
                  {p.salesVelocity.toFixed(1)}/일
                </TableCell>
                <TableCell align="right" sx={{ fontSize: 12 }}>{formatRatio(p.conversionRate)}</TableCell>
                <TableCell align="right" sx={{ fontSize: 12 }}>{p.currentStock.toLocaleString()}개</TableCell>
                <TableCell align="right" sx={{ fontSize: 12, color: p.sellThroughRate >= 80 ? "error.main" : "text.primary", fontWeight: p.sellThroughRate >= 80 ? 700 : 400 }}>
                  {p.sellThroughRate.toFixed(1)}%
                </TableCell>
                <TableCell align="right" sx={{ fontSize: 12, color: p.daysToSellOut !== null && p.daysToSellOut <= 7 ? "error.main" : "text.secondary", fontWeight: p.daysToSellOut !== null && p.daysToSellOut <= 7 ? 700 : 400 }}>
                  {p.daysToSellOut === null ? "—" : `${p.daysToSellOut}일`}
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
            ))
          )}
        </TableBody>
      </Table>
    </Paper>
  )
}
