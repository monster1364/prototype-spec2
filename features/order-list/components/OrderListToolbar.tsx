"use client"

import { Box, Button, Typography } from "@mui/material"
import RefreshIcon from "@mui/icons-material/Refresh"
import CancelIcon from "@mui/icons-material/Cancel"

interface Props {
  totalCount: number
  updatedAt: string
  selectedCount: number
  isRefreshing: boolean
  onRefresh: () => void
  onBulkCancel: () => void
}

export default function OrderListToolbar({
  totalCount,
  updatedAt,
  selectedCount,
  isRefreshing,
  onRefresh,
  onBulkCancel,
}: Props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", py: 1 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Typography fontSize={14} fontWeight={600}>
          {totalCount.toLocaleString()} Results
        </Typography>
        <Typography fontSize={12} color="text.disabled">
          Updated {updatedAt}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", gap: 1 }}>
        <Button
          size="small"
          variant="outlined"
          startIcon={<RefreshIcon fontSize="small" />}
          onClick={onRefresh}
          disabled={isRefreshing}
          sx={{ fontSize: 13 }}
        >
          {isRefreshing ? "Refreshing..." : "Refresh"}
        </Button>
        <Button
          size="small"
          variant="outlined"
          color="error"
          startIcon={<CancelIcon fontSize="small" />}
          onClick={onBulkCancel}
          disabled={selectedCount === 0}
          sx={{ fontSize: 13 }}
        >
          Bulk Cancel{selectedCount > 0 ? ` (${selectedCount})` : ""}
        </Button>
      </Box>
    </Box>
  )
}
