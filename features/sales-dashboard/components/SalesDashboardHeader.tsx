"use client"

import {
  Box, Button, Chip, Divider, FormControl, InputLabel,
  MenuItem, OutlinedInput, Paper, Select, Stack,
  ToggleButton, ToggleButtonGroup, Typography,
} from "@mui/material"
import FileDownloadIcon from "@mui/icons-material/FileDownload"
import RestartAltIcon from "@mui/icons-material/RestartAlt"
import type { SelectChangeEvent } from "@mui/material"
import type { PeriodUnit } from "../models/types"
import { PERIOD_UNIT_LABELS, CATEGORY_LIST, COLLECTION_LIST } from "../modules/constants"
import { formatBatchDate } from "../modules/utils"

interface Props {
  periodUnit: PeriodUnit
  onPeriodChange: (unit: PeriodUnit) => void
  dateRange: { from: string; to: string }
  onDateRangeChange: (range: { from: string; to: string }) => void
  selectedCategories: string[]
  onCategoryChange: (cats: string[]) => void
  selectedCollections: string[]
  onCollectionChange: (cols: string[]) => void
  onExcelDownload: () => void
  updatedAt: string
}

const DATE_PLACEHOLDER: Record<PeriodUnit, { from: string; to: string }> = {
  daily:   { from: '2026-03-01', to: '2026-03-23' },
  monthly: { from: '2025-04',    to: '2026-03' },
  yearly:  { from: '2022',       to: '2026' },
}

export function SalesDashboardHeader({
  periodUnit, onPeriodChange,
  dateRange, onDateRangeChange,
  selectedCategories, onCategoryChange,
  selectedCollections, onCollectionChange,
  onExcelDownload, updatedAt,
}: Props) {
  function handlePeriodChange(_: React.MouseEvent<HTMLElement>, val: PeriodUnit | null) {
    if (!val) return
    onPeriodChange(val)
    onDateRangeChange(DATE_PLACEHOLDER[val])
  }

  function handleCategoryChange(e: SelectChangeEvent<string[]>) {
    onCategoryChange(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value)
  }

  function handleCollectionChange(e: SelectChangeEvent<string[]>) {
    onCollectionChange(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value)
  }

  function handleReset() {
    onPeriodChange('monthly')
    onDateRangeChange(DATE_PLACEHOLDER.monthly)
    onCategoryChange([])
    onCollectionChange([])
  }

  const inputType = periodUnit === 'daily' ? 'date' : periodUnit === 'monthly' ? 'month' : 'number'

  return (
    <Paper variant="outlined" sx={{ p: 2.5, mb: 2.5, borderRadius: 1.5 }}>
      {/* 상단: 제목 + 배치 기준 + 다운로드 */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
        <Box>
          <Typography variant="h6" fontWeight={700} fontSize={18} lineHeight={1.2}>
            Sales Dashboard
          </Typography>
          <Typography variant="caption" color="text.secondary" fontSize={11}>
            기준: {formatBatchDate(updatedAt)} 배치 · 일일 오전 9시 갱신
          </Typography>
        </Box>
        <Button
          variant="outlined"
          size="small"
          startIcon={<FileDownloadIcon fontSize="small" />}
          onClick={onExcelDownload}
          sx={{ textTransform: "none", fontWeight: 600, fontSize: 13 }}
        >
          Excel 다운로드
        </Button>
      </Stack>

      <Divider sx={{ mb: 2 }} />

      {/* 하단: 필터 */}
      <Stack direction="row" alignItems="center" gap={2} flexWrap="wrap">
        {/* 기간 토글 */}
        <ToggleButtonGroup
          value={periodUnit}
          exclusive
          onChange={handlePeriodChange}
          size="small"
          sx={{ "& .MuiToggleButton-root": { px: 2, py: 0.5, fontSize: 13, fontWeight: 600, textTransform: "none" } }}
        >
          {(Object.keys(PERIOD_UNIT_LABELS) as PeriodUnit[]).map((unit) => (
            <ToggleButton key={unit} value={unit}>
              {PERIOD_UNIT_LABELS[unit]}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        {/* 날짜 범위 */}
        <Stack direction="row" alignItems="center" gap={1}>
          <Box
            component="input"
            type={inputType}
            value={dateRange.from}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onDateRangeChange({ ...dateRange, from: e.target.value })
            }
            sx={{
              border: "1px solid", borderColor: "divider", borderRadius: 1,
              px: 1.5, py: 0.75, fontSize: 13, fontFamily: "inherit",
              outline: "none", "&:focus": { borderColor: "primary.main" },
              color: "text.primary", bgcolor: "background.paper",
            }}
          />
          <Typography variant="body2" color="text.secondary">~</Typography>
          <Box
            component="input"
            type={inputType}
            value={dateRange.to}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onDateRangeChange({ ...dateRange, to: e.target.value })
            }
            sx={{
              border: "1px solid", borderColor: "divider", borderRadius: 1,
              px: 1.5, py: 0.75, fontSize: 13, fontFamily: "inherit",
              outline: "none", "&:focus": { borderColor: "primary.main" },
              color: "text.primary", bgcolor: "background.paper",
            }}
          />
        </Stack>

        {/* 카테고리 필터 */}
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel sx={{ fontSize: 13 }}>카테고리</InputLabel>
          <Select
            multiple
            value={selectedCategories}
            onChange={handleCategoryChange}
            input={<OutlinedInput label="카테고리" />}
            renderValue={(selected) =>
              selected.length === 0 ? "전체" :
              selected.length === 1 ? selected[0] :
              <Chip label={`${selected.length}개 선택`} size="small" />
            }
            sx={{ fontSize: 13 }}
          >
            {CATEGORY_LIST.map((cat) => (
              <MenuItem key={cat} value={cat} sx={{ fontSize: 13 }}>{cat}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* 컬렉션 필터 */}
        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel sx={{ fontSize: 13 }}>컬렉션</InputLabel>
          <Select
            multiple
            value={selectedCollections}
            onChange={handleCollectionChange}
            input={<OutlinedInput label="컬렉션" />}
            renderValue={(selected) =>
              selected.length === 0 ? "전체" :
              selected.length === 1 ? selected[0] :
              <Chip label={`${selected.length}개 선택`} size="small" />
            }
            sx={{ fontSize: 13 }}
          >
            {COLLECTION_LIST.map((col) => (
              <MenuItem key={col} value={col} sx={{ fontSize: 13 }}>{col}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* 초기화 */}
        <Button
          size="small"
          startIcon={<RestartAltIcon fontSize="small" />}
          onClick={handleReset}
          sx={{ textTransform: "none", fontSize: 13, color: "text.secondary" }}
        >
          초기화
        </Button>
      </Stack>
    </Paper>
  )
}
