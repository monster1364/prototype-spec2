"use client"

import { Box, Chip, Tooltip } from "@mui/material"
import CodeIcon from "@mui/icons-material/Code"

interface Props {
  name: string          // 컴포넌트 이름 (예: "StatusSummary")
  filePath: string      // 파일 경로 (예: "features/order-dashboard/components/StatusSummary.tsx")
  enabled: boolean
  children: React.ReactNode
  color?: string
  specFile?: string
  onSpecClick?: (file: string) => void
}

export function DevModeWrapper({ name, filePath, enabled, children, color = "#7c3aed", specFile, onSpecClick }: Props) {
  if (!enabled) return <>{children}</>

  const clickable = !!specFile && !!onSpecClick

  return (
    <Box
      sx={{
        position: "relative",
        outline: `2px dashed ${color}`,
        borderRadius: 1,
        "&:hover > .dev-label": { opacity: 1 },
      }}
    >
      <Tooltip
        title={clickable ? `${filePath} — 클릭하면 정책 열림` : filePath}
        placement="top-start"
        arrow
      >
        <Chip
          className="dev-label"
          icon={<CodeIcon sx={{ fontSize: "12px !important" }} />}
          label={name}
          size="small"
          onClick={clickable ? () => onSpecClick!(specFile!) : undefined}
          sx={{
            position: "absolute",
            top: -12,
            left: 8,
            zIndex: 100,
            bgcolor: color,
            color: "white",
            fontSize: 10,
            fontWeight: 700,
            height: 22,
            opacity: 0.9,
            cursor: clickable ? "pointer" : "default",
            "& .MuiChip-icon": { color: "white" },
            transition: "opacity 0.15s",
            "&:hover": clickable ? { opacity: 1, filter: "brightness(1.15)" } : {},
          }}
        />
      </Tooltip>
      {children}
    </Box>
  )
}
