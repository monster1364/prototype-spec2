"use client"

import NextLink from "next/link"
import { Box, Button, Chip, Link, Paper, Stack, Typography } from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import CloseIcon from "@mui/icons-material/Close"
import type { DashboardOrderItem, OrderTab } from "../models/types"
import { formatTableDate, getStatusChipProps } from "../modules/utils"

const columns: GridColDef[] = [
  {
    field: "channel",
    headerName: "Channel",
    width: 100,
    sortable: false,
    renderCell: (params) => (
      <Chip
        label={params.value}
        size="small"
        variant="outlined"
        sx={{ fontSize: 11, height: 22 }}
      />
    ),
  },
  {
    field: "orderNo",
    headerName: "Order No",
    width: 190,
    renderCell: (params) => (
      <Link
        component={NextLink}
        href="/common/oms/order"
        underline="hover"
        sx={{ fontFamily: "monospace", fontSize: 12, fontWeight: 600 }}
      >
        {params.value}
      </Link>
    ),
  },
  {
    field: "orderDate",
    headerName: "Order Date",
    width: 150,
    renderCell: (params) => (
      <Typography variant="caption" sx={{ fontFamily: "monospace" }}>
        {formatTableDate(params.value)}
      </Typography>
    ),
  },
  {
    field: "ordererEmail",
    headerName: "Orderer Email",
    width: 210,
    renderCell: (params) => (
      <Typography variant="body2" color="text.secondary">
        {params.value}
      </Typography>
    ),
  },
  {
    field: "status",
    headerName: "Status",
    width: 170,
    renderCell: (params) => (
      <Chip
        label={params.value}
        size="small"
        {...getStatusChipProps(params.row.detailStatus)}
        sx={{ fontSize: 11, height: 22 }}
      />
    ),
  },
  {
    field: "fulfillmentNo",
    headerName: "Fulfillment No",
    width: 175,
    renderCell: (params) => (
      <Typography variant="caption" sx={{ fontFamily: "monospace", color: params.value === "-" ? "text.disabled" : "text.primary" }}>
        {params.value}
      </Typography>
    ),
  },
  {
    field: "fulfillmentStatus",
    headerName: "Fulfillment Status",
    width: 155,
    renderCell: (params) => (
      <Typography variant="body2" color={params.value === "-" ? "text.disabled" : "text.secondary"}>
        {params.value}
      </Typography>
    ),
  },
  {
    field: "recipientName",
    headerName: "Recipient Name",
    width: 140,
  },
]

interface Props {
  items: DashboardOrderItem[]
  activeTab: OrderTab
  selectedStatusLabel: string | null
  selectedStatus: string | null
  onClearFilter: () => void
}

export function OrderListTable({
  items,
  activeTab,
  selectedStatusLabel,
  selectedStatus,
  onClearFilter,
}: Props) {
  return (
    <Paper variant="outlined" sx={{ overflow: "hidden", borderRadius: 1.5 }}>
      {/* Toolbar */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          px: 2,
          py: 1.25,
          borderBottom: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="subtitle2" fontSize={13}>
            <Box component="span" color="text.secondary">
              {activeTab} ·{" "}
            </Box>
            {selectedStatusLabel ?? "All"}
          </Typography>
          <Chip
            label={`${items.length.toLocaleString()} rows`}
            size="small"
            sx={{ height: 20, fontSize: 11 }}
          />
        </Stack>
        {selectedStatus && (
          <Button
            size="small"
            color="inherit"
            startIcon={<CloseIcon sx={{ fontSize: "14px !important" }} />}
            onClick={onClearFilter}
            sx={{ color: "text.secondary", textTransform: "none", fontSize: 12 }}
          >
            Clear filter
          </Button>
        )}
      </Stack>

      {/* DataGrid */}
      <DataGrid
        rows={items}
        columns={columns}
        getRowId={(row) => row.id}
        initialState={{
          pagination: { paginationModel: { pageSize: 100 } },
        }}
        pageSizeOptions={[25, 50, 100]}
        disableRowSelectionOnClick
        autoHeight
        localeText={{
          noRowsLabel: "No data found — There are no orders matching the selected status.",
        }}
        sx={{
          border: "none",
          fontSize: 13,
          "& .MuiDataGrid-columnHeaders": {
            bgcolor: "grey.50",
            fontSize: 11,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.04em",
            color: "text.secondary",
          },
          "& .MuiDataGrid-columnHeader": { bgcolor: "grey.50" },
          "& .MuiDataGrid-row:hover": { bgcolor: "grey.50" },
          "& .MuiDataGrid-cell": {
            display: "flex",
            alignItems: "center",
            borderBottom: "1px solid",
            borderColor: "grey.100",
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "1px solid",
            borderColor: "divider",
          },
        }}
      />
    </Paper>
  )
}
