"use client"

import { Box, Chip, Divider, Paper, Stack, Typography } from "@mui/material"
import type { SalesChannelData } from "../models/types"
import { CHANNEL_COLORS } from "../modules/constants"
import { formatRevenue, formatRevenueShort, formatRatio, describeArc, ratiosToAngles } from "../modules/utils"

interface Props {
  data: SalesChannelData
}

const CX = 70, CY = 70, R = 52, SW = 18

export function ChannelCompare({ data }: Props) {
  const total = data.online + data.offline + data.gift
  const ratios = [data.online, data.offline, data.gift]
  const colors = [CHANNEL_COLORS.online, CHANNEL_COLORS.offline, CHANNEL_COLORS.gift]
  const angles = ratiosToAngles(ratios)

  const channels = [
    { label: "온라인", value: data.online, color: CHANNEL_COLORS.online },
    { label: "오프라인", value: data.offline, color: CHANNEL_COLORS.offline },
    { label: "선물하기", value: data.gift, color: CHANNEL_COLORS.gift },
  ].filter((ch) => ch.value > 0)

  return (
    <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 1.5, height: "100%" }}>
      <Stack direction="row" alignItems="center" gap={1} mb={2}>
        <Typography variant="subtitle2" fontWeight={700} fontSize={13}>채널별 매출 비교</Typography>
        <Chip label="오프라인·채널 매출 연동 필요" size="small" sx={{ fontSize: 11, bgcolor: '#fef3c7', color: '#92400e', fontWeight: 600 }} />
      </Stack>

      <Stack direction="row" alignItems="center" gap={3}>
        {/* SVG Donut */}
        <Box sx={{ flexShrink: 0, position: "relative" }}>
          <Box component="svg" viewBox="0 0 140 140" sx={{ width: 140, height: 140 }}>
            {/* 배경 원 */}
            <circle cx={CX} cy={CY} r={R} fill="none" stroke="#f0f0f0" strokeWidth={SW} />
            {/* 각 채널 호 */}
            {angles.map((arc, i) => (
              <path
                key={i}
                d={describeArc(CX, CY, R, arc.start, arc.end)}
                fill="none"
                stroke={colors[i]}
                strokeWidth={SW}
                strokeLinecap="round"
              />
            ))}
          </Box>
          {/* 중앙 텍스트 */}
          <Box sx={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <Typography variant="caption" color="text.secondary" fontSize={10}>총 매출</Typography>
            <Typography variant="body2" fontWeight={700} fontSize={13} lineHeight={1.2}>
              {formatRevenueShort(total)}
            </Typography>
          </Box>
        </Box>

        {/* 범례 */}
        <Stack spacing={1.5} flex={1}>
          {channels.map((ch) => (
            <Box key={ch.label}>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Stack direction="row" alignItems="center" gap={0.75}>
                  <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: ch.color, flexShrink: 0 }} />
                  <Typography variant="caption" color="text.secondary" fontSize={12}>{ch.label}</Typography>
                </Stack>
                <Typography variant="caption" fontWeight={700} fontSize={12}>
                  {formatRatio((ch.value / total) * 100)}
                </Typography>
              </Stack>
              <Typography variant="caption" color="text.disabled" fontSize={11} sx={{ pl: 2.25 }}>
                {formatRevenue(ch.value)}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Stack>

      <Divider sx={{ my: 2 }} />

      {/* 선물하기 강조 */}
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="caption" color="text.secondary" fontSize={12}>
          선물하기 주문
        </Typography>
        <Stack direction="row" alignItems="center" gap={1}>
          <Typography variant="caption" fontWeight={600} fontSize={12}>
            {data.giftOrderCount.toLocaleString()}건
          </Typography>
          <Chip
            label={formatRatio(data.giftRatio)}
            size="small"
            sx={{ bgcolor: "#fff3e0", color: CHANNEL_COLORS.gift, fontWeight: 700, fontSize: 11, height: 20 }}
          />
        </Stack>
      </Stack>
    </Paper>
  )
}
