"use client"

import { Box, Button, CircularProgress, Stack, Typography } from "@mui/material"
import RefreshIcon from "@mui/icons-material/Refresh"
import { formatUpdatedAt } from "../modules/utils"

interface Props {
  updatedAt: string
  isRefreshing: boolean
  onRefresh: () => void
}

export function DashboardHeader({ updatedAt, isRefreshing, onRefresh }: Props) {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2.5}>
      <Typography variant="h6" fontWeight={700}>
        Order Dashboard
      </Typography>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Typography variant="caption" color="text.secondary">
          Updated at:{" "}
          <Box
            component="span"
            suppressHydrationWarning
            sx={{ fontFamily: "monospace", color: "text.primary", fontWeight: 500 }}
          >
            {formatUpdatedAt(updatedAt)}
          </Box>
        </Typography>
        <Button
          variant="outlined"
          size="small"
          startIcon={
            isRefreshing ? (
              <CircularProgress size={13} color="inherit" />
            ) : (
              <RefreshIcon fontSize="small" />
            )
          }
          onClick={onRefresh}
          disabled={isRefreshing}
          sx={{ textTransform: "none", minWidth: 100 }}
        >
          {isRefreshing ? "Refreshing..." : "Refresh"}
        </Button>
      </Stack>
    </Stack>
  )
}
