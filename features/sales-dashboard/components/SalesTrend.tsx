"use client"

import { Box, Chip, Paper, Stack, Typography } from "@mui/material"
import { useState } from "react"
import type { SalesTrendItem, PeriodUnit } from "../models/types"
import { CHART_PRIMARY_COLOR, CHART_PREV_YEAR_COLOR } from "../modules/constants"
import { formatRevenueShort } from "../modules/utils"

interface Props {
  data: SalesTrendItem[]
  periodUnit: PeriodUnit
}

const W = 520, H = 140, PAD_L = 48, PAD_R = 12, PAD_T = 16, PAD_B = 28

export function SalesTrend({ data, periodUnit }: Props) {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null)

  if (data.length === 0) return null

  const maxVal = Math.max(...data.map((d) => Math.max(d.revenue, d.revenuePrevYear))) * 1.1
  const chartW = W - PAD_L - PAD_R
  const chartH = H - PAD_T - PAD_B

  const xOf = (i: number) => PAD_L + (i / (data.length - 1)) * chartW
  const yOf = (v: number) => PAD_T + chartH - (v / maxVal) * chartH

  const thisPoints = data.map((d, i) => `${xOf(i)},${yOf(d.revenue)}`).join(" ")
  const prevPoints = data.map((d, i) => `${xOf(i)},${yOf(d.revenuePrevYear)}`).join(" ")

  const periodLabel = periodUnit === 'daily' ? '일별' : periodUnit === 'monthly' ? '월별' : '연도별'

  return (
    <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 1.5, height: "100%" }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1.5}>
        <Stack direction="row" alignItems="center" gap={1}>
          <Typography variant="subtitle2" fontWeight={700} fontSize={13}>
            매출 추이 <Typography component="span" variant="caption" color="text.secondary">({periodLabel})</Typography>
          </Typography>
          <Chip label="일부 적용 · 주문 증감 OMS 기반" size="small" sx={{ fontSize: 11, bgcolor: '#fef3c7', color: '#92400e', fontWeight: 600 }} />
        </Stack>
        <Stack direction="row" gap={2}>
          <Stack direction="row" alignItems="center" gap={0.5}>
            <Box sx={{ width: 24, height: 2, bgcolor: CHART_PRIMARY_COLOR }} />
            <Typography variant="caption" fontSize={11} color="text.secondary">이번 기간</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" gap={0.5}>
            <Box sx={{ width: 24, height: 0, borderTop: "2px dashed", borderColor: CHART_PREV_YEAR_COLOR }} />
            <Typography variant="caption" fontSize={11} color="text.secondary">전년 동기</Typography>
          </Stack>
        </Stack>
      </Stack>

      {/* SVG 차트 */}
      <Box sx={{ position: "relative" }}>
        <Box
          component="svg"
          viewBox={`0 0 ${W} ${H}`}
          sx={{ width: "100%", height: "auto", display: "block", overflow: "visible" }}
        >
          {/* Y축 격선 */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
            const y = PAD_T + chartH * ratio
            return (
              <g key={ratio}>
                <line x1={PAD_L} y1={y} x2={W - PAD_R} y2={y} stroke="#f0f0f0" strokeWidth={1} />
                <text x={PAD_L - 4} y={y + 4} textAnchor="end" fontSize={9} fill="#9e9e9e">
                  {formatRevenueShort(maxVal * (1 - ratio))}
                </text>
              </g>
            )
          })}

          {/* 전년 비교 (점선) */}
          <polyline
            points={prevPoints}
            fill="none"
            stroke={CHART_PREV_YEAR_COLOR}
            strokeWidth={1.5}
            strokeDasharray="4 3"
          />

          {/* 이번 기간 */}
          <polyline points={thisPoints} fill="none" stroke={CHART_PRIMARY_COLOR} strokeWidth={2} />

          {/* 호버 포인트 */}
          {data.map((d, i) => (
            <g key={i}>
              <circle
                cx={xOf(i)} cy={yOf(d.revenue)} r={hoverIdx === i ? 5 : 3}
                fill={hoverIdx === i ? CHART_PRIMARY_COLOR : "white"}
                stroke={CHART_PRIMARY_COLOR} strokeWidth={2}
                style={{ cursor: "pointer" }}
                onMouseEnter={() => setHoverIdx(i)}
                onMouseLeave={() => setHoverIdx(null)}
              />
              {/* X축 레이블 — 전체 중 일부만 표시 */}
              {(i === 0 || i === data.length - 1 || i % Math.ceil(data.length / 6) === 0) && (
                <text x={xOf(i)} y={H - 4} textAnchor="middle" fontSize={9} fill="#9e9e9e">
                  {d.label}
                </text>
              )}
            </g>
          ))}
        </Box>

        {/* 호버 툴팁 */}
        {hoverIdx !== null && (
          <Box
            sx={{
              position: "absolute",
              top: PAD_T,
              left: `${(xOf(hoverIdx) / W) * 100}%`,
              transform: "translate(-50%, -110%)",
              bgcolor: "grey.900",
              color: "white",
              px: 1.5, py: 1,
              borderRadius: 1,
              pointerEvents: "none",
              zIndex: 10,
              whiteSpace: "nowrap",
            }}
          >
            <Typography variant="caption" fontSize={11} fontWeight={700} display="block">
              {data[hoverIdx].label}
            </Typography>
            <Typography variant="caption" fontSize={11} display="block">
              이번: {formatRevenueShort(data[hoverIdx].revenue)}
            </Typography>
            <Typography variant="caption" fontSize={11} display="block" color="grey.400">
              전년: {formatRevenueShort(data[hoverIdx].revenuePrevYear)}
            </Typography>
          </Box>
        )}
      </Box>
    </Paper>
  )
}
