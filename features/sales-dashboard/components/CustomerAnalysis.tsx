"use client"

import { Box, Grid, Paper, Stack, Typography } from "@mui/material"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import FavoriteIcon from "@mui/icons-material/Favorite"
import type { CustomerAnalysisData } from "../models/types"
import { describeArc, ratiosToAngles, formatRatio } from "../modules/utils"

interface Props {
  data: CustomerAnalysisData
}

const CX = 70, CY = 70, R = 52, SW = 18
const COLORS = { new: '#1976d2', repeat: '#7b1fa2' }

export function CustomerAnalysis({ data }: Props) {
  const angles = ratiosToAngles([data.newCustomers, data.repeatCustomers])

  return (
    <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 1.5 }}>
      <Typography variant="subtitle2" fontWeight={700} fontSize={13} mb={2}>
        고객 분석
      </Typography>
      <Grid container spacing={3} alignItems="center">
        {/* Donut */}
        <Grid size={3}>
          <Box sx={{ position: "relative", display: "inline-block" }}>
            <Box component="svg" viewBox="0 0 140 140" sx={{ width: 140, height: 140 }}>
              <circle cx={CX} cy={CY} r={R} fill="none" stroke="#f0f0f0" strokeWidth={SW} />
              <path
                d={describeArc(CX, CY, R, angles[0].start, angles[0].end)}
                fill="none" stroke={COLORS.new} strokeWidth={SW} strokeLinecap="round"
              />
              <path
                d={describeArc(CX, CY, R, angles[1].start, angles[1].end)}
                fill="none" stroke={COLORS.repeat} strokeWidth={SW} strokeLinecap="round"
              />
            </Box>
            <Box sx={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <Typography variant="caption" color="text.secondary" fontSize={10}>총 고객</Typography>
              <Typography variant="body2" fontWeight={700} fontSize={14}>
                {data.totalCustomers.toLocaleString()}
              </Typography>
              <Typography variant="caption" color="text.disabled" fontSize={10}>명</Typography>
            </Box>
          </Box>
        </Grid>

        {/* 신규 / 재구매 수치 */}
        <Grid size={4}>
          <Stack spacing={2}>
            {[
              { label: "신규 고객", value: data.newCustomers, ratio: data.newRatio, color: COLORS.new },
              { label: "재구매 고객", value: data.repeatCustomers, ratio: data.repeatRatio, color: COLORS.repeat },
            ].map((item) => (
              <Stack key={item.label} direction="row" alignItems="center" gap={1.5}>
                <Box sx={{ width: 12, height: 12, borderRadius: "50%", bgcolor: item.color, flexShrink: 0 }} />
                <Box>
                  <Typography variant="caption" color="text.secondary" fontSize={11}>{item.label}</Typography>
                  <Stack direction="row" alignItems="baseline" gap={0.75}>
                    <Typography variant="body2" fontWeight={700} fontSize={16}>
                      {item.value.toLocaleString()}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" fontSize={11}>명</Typography>
                    <Typography variant="caption" fontWeight={700} fontSize={12} sx={{ color: item.color }}>
                      {formatRatio(item.ratio)}
                    </Typography>
                  </Stack>
                </Box>
              </Stack>
            ))}
          </Stack>
        </Grid>

        {/* 장바구니 / 위시리스트 */}
        <Grid size={5}>
          <Grid container spacing={2}>
            {[
              { icon: <ShoppingCartIcon sx={{ fontSize: 20, color: "#1976d2" }} />, label: "장바구니 추가", value: data.cartAddCount, color: "#e3f2fd" },
              { icon: <FavoriteIcon sx={{ fontSize: 20, color: "#e91e63" }} />, label: "위시리스트 추가", value: data.wishlistAddCount, color: "#fce4ec" },
            ].map((item) => (
              <Grid size={6} key={item.label}>
                <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 1.5, bgcolor: item.color, border: "none" }}>
                  <Stack direction="row" alignItems="center" gap={1} mb={0.5}>
                    {item.icon}
                    <Typography variant="caption" color="text.secondary" fontSize={11}>{item.label}</Typography>
                  </Stack>
                  <Typography variant="h6" fontWeight={700} fontSize={20}>
                    {item.value.toLocaleString()}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" fontSize={11}>건</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}
