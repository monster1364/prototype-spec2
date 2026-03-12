"use client"

import { Box, Button, Tooltip } from "@mui/material"
import CodeIcon from "@mui/icons-material/Code"
import CodeOffIcon from "@mui/icons-material/CodeOff"

interface Props {
  enabled: boolean
  onToggle: () => void
}

export function DevModeToggle({ enabled, onToggle }: Props) {
  return (
    <Tooltip
      title={enabled ? "Dev Mode 끄기" : "Dev Mode: 컴포넌트 이름 표시"}
      placement="right"
    >
      <Box
        sx={{
          position: "fixed",
          bottom: 24,
          left: 24,
          zIndex: 9999,
        }}
      >
        <Button
          variant={enabled ? "contained" : "outlined"}
          size="small"
          onClick={onToggle}
          startIcon={enabled ? <CodeOffIcon fontSize="small" /> : <CodeIcon fontSize="small" />}
          sx={{
            textTransform: "none",
            fontWeight: 600,
            fontSize: 12,
            bgcolor: enabled ? "#7c3aed" : "background.paper",
            borderColor: "#7c3aed",
            color: enabled ? "white" : "#7c3aed",
            "&:hover": {
              bgcolor: enabled ? "#6d28d9" : "#f5f3ff",
              borderColor: "#6d28d9",
            },
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          }}
        >
          {enabled ? "Dev Mode ON" : "Dev Mode"}
        </Button>
      </Box>
    </Tooltip>
  )
}
