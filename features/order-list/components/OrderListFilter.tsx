"use client"

import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputAdornment,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import RestartAltIcon from "@mui/icons-material/RestartAlt"
import type { FilterState } from "../models/types"
import {
  ORDER_LIST_STATUSES,
  SEARCH_TYPE_OPTIONS,
  SHIPPING_STATUSES,
} from "../modules/constants"
import type { OrderChannel, OrderListStatus, OrderShippingStatus } from "@/mock-data"

interface Props {
  filters: FilterState
  onChange: (filters: FilterState) => void
  onSearch: () => void
  onReset: () => void
}

const CHANNELS: OrderChannel[] = ["OWN_KR", "OWN_INT"]

function setDateRange(daysAgo: number, filters: FilterState): FilterState {
  const end = new Date()
  const start = new Date()
  start.setDate(start.getDate() - daysAgo)
  return {
    ...filters,
    startDate: start.toISOString().slice(0, 10),
    endDate: end.toISOString().slice(0, 10),
  }
}

export default function OrderListFilter({ filters, onChange, onSearch, onReset }: Props) {
  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Stack spacing={1.5}>
        {/* Row 1: Search type + keyword */}
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography fontSize={13} color="text.secondary" sx={{ whiteSpace: "nowrap" }}>
            Search
          </Typography>
          <RadioGroup
            row
            value={filters.searchType}
            onChange={(e) => onChange({ ...filters, searchType: e.target.value as FilterState["searchType"] })}
          >
            {SEARCH_TYPE_OPTIONS.map((opt) => (
              <FormControlLabel
                key={opt.value}
                value={opt.value}
                control={<Radio size="small" />}
                label={<Typography fontSize={13}>{opt.label}</Typography>}
                sx={{ mr: 1 }}
              />
            ))}
          </RadioGroup>
          <TextField
            size="small"
            placeholder="검색어를 입력하세요"
            value={filters.searchKeyword}
            onChange={(e) => onChange({ ...filters, searchKeyword: e.target.value })}
            onKeyDown={(e) => { if (e.key === "Enter") onSearch() }}
            sx={{ width: 280 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" sx={{ color: "text.disabled" }} />
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        {/* Row 2: Multi-selects + Date range */}
        <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap">
          {/* Order Status */}
          <FormControl size="small" sx={{ minWidth: 170 }}>
            <Select
              multiple
              displayEmpty
              value={filters.orderStatuses}
              onChange={(e) =>
                onChange({ ...filters, orderStatuses: e.target.value as OrderListStatus[] })
              }
              input={<OutlinedInput />}
              renderValue={(selected) =>
                selected.length === 0
                  ? <Typography fontSize={13} color="text.disabled">Order Status</Typography>
                  : <Typography fontSize={13}>Order Status ({selected.length})</Typography>
              }
            >
              {ORDER_LIST_STATUSES.map((s) => (
                <MenuItem key={s} value={s} dense>
                  <Checkbox size="small" checked={filters.orderStatuses.includes(s)} />
                  <ListItemText primary={<Typography fontSize={13}>{s}</Typography>} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Shipping Status */}
          <FormControl size="small" sx={{ minWidth: 180 }}>
            <Select
              multiple
              displayEmpty
              value={filters.shippingStatuses}
              onChange={(e) =>
                onChange({ ...filters, shippingStatuses: e.target.value as OrderShippingStatus[] })
              }
              input={<OutlinedInput />}
              renderValue={(selected) =>
                selected.length === 0
                  ? <Typography fontSize={13} color="text.disabled">Shipping Status</Typography>
                  : <Typography fontSize={13}>Shipping Status ({selected.length})</Typography>
              }
            >
              {SHIPPING_STATUSES.map((s) => (
                <MenuItem key={s} value={s} dense>
                  <Checkbox size="small" checked={filters.shippingStatuses.includes(s)} />
                  <ListItemText primary={<Typography fontSize={13}>{s}</Typography>} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Channel */}
          <FormControl size="small" sx={{ minWidth: 140 }}>
            <Select
              multiple
              displayEmpty
              value={filters.channels}
              onChange={(e) =>
                onChange({ ...filters, channels: e.target.value as OrderChannel[] })
              }
              input={<OutlinedInput />}
              renderValue={(selected) =>
                selected.length === 0
                  ? <Typography fontSize={13} color="text.disabled">Channel</Typography>
                  : <Typography fontSize={13}>Channel ({selected.length})</Typography>
              }
            >
              {CHANNELS.map((ch) => (
                <MenuItem key={ch} value={ch} dense>
                  <Checkbox size="small" checked={filters.channels.includes(ch)} />
                  <ListItemText primary={<Typography fontSize={13}>{ch}</Typography>} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Date range */}
          <Stack direction="row" spacing={0.5} alignItems="center">
            <TextField
              size="small"
              type="date"
              value={filters.startDate}
              onChange={(e) => onChange({ ...filters, startDate: e.target.value })}
              sx={{ width: 150 }}
              inputProps={{ style: { fontSize: 13 } }}
            />
            <Typography fontSize={13} color="text.secondary">~</Typography>
            <TextField
              size="small"
              type="date"
              value={filters.endDate}
              onChange={(e) => onChange({ ...filters, endDate: e.target.value })}
              sx={{ width: 150 }}
              inputProps={{ style: { fontSize: 13 } }}
            />
          </Stack>

          {/* Shortcut buttons */}
          <Stack direction="row" spacing={0.5}>
            {[
              { label: "Today", days: 0 },
              { label: "1W",    days: 7 },
              { label: "1M",    days: 30 },
              { label: "3M",    days: 90 },
            ].map(({ label, days }) => (
              <Button
                key={label}
                size="small"
                variant="outlined"
                onClick={() => onChange(setDateRange(days, filters))}
                sx={{ minWidth: 0, px: 1, fontSize: 12, height: 32 }}
              >
                {label}
              </Button>
            ))}
          </Stack>
        </Stack>

        {/* Row 3: Action buttons (right-aligned) */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
          <Button
            size="small"
            variant="outlined"
            startIcon={<RestartAltIcon fontSize="small" />}
            onClick={onReset}
            sx={{ fontSize: 13 }}
          >
            Reset
          </Button>
          <Button
            size="small"
            variant="contained"
            startIcon={<SearchIcon fontSize="small" />}
            onClick={onSearch}
            sx={{ fontSize: 13 }}
          >
            Search
          </Button>
        </Box>
      </Stack>
    </Paper>
  )
}
