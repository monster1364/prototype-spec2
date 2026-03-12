"use client"

import { Box, Button, Chip, Stack, Typography } from "@mui/material"
import { DataGrid, type GridColDef, type GridRenderCellParams, type GridRowSelectionModel } from "@mui/x-data-grid"
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline"
import NextLink from "next/link"
import type { OrderListItem, OrderListStatus, OrderShippingStatus } from "@/mock-data"
import {
  ORDER_STATUS_CHIP_COLOR,
  SHIPPING_STATUS_CHIP_COLOR,
} from "../modules/constants"

interface Props {
  items: OrderListItem[]
  selectedIds: string[]
  onSelectionChange: (ids: string[]) => void
  isLoading?: boolean
  isError?: boolean
  onRetry?: () => void
}

function StatusChip({ status }: { status: OrderListStatus }) {
  const { bg, color } = ORDER_STATUS_CHIP_COLOR[status]
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        px: 1,
        py: 0.25,
        borderRadius: 1,
        backgroundColor: bg,
        color,
        fontSize: 12,
        fontWeight: 500,
        whiteSpace: "nowrap",
      }}
    >
      {status}
    </Box>
  )
}

function ShippingChip({ status }: { status: OrderShippingStatus }) {
  const { bg, color } = SHIPPING_STATUS_CHIP_COLOR[status]
  return (
    <Box
      sx={{
        display: "inline-flex",
        px: 0.75,
        py: 0.15,
        borderRadius: 0.75,
        backgroundColor: bg,
        color,
        fontSize: 11,
        fontWeight: 500,
        whiteSpace: "nowrap",
      }}
    >
      {status}
    </Box>
  )
}

const columns: GridColDef<OrderListItem>[] = [
  {
    field: "channel",
    headerName: "Channel",
    width: 90,
    renderCell: ({ value }) => (
      <Typography fontSize={12} fontWeight={500}>
        {value}
      </Typography>
    ),
  },
  {
    field: "orderId",
    headerName: "Order No",
    width: 200,
    renderCell: ({ value }) => (
      <NextLink
        href={`/common/oms/integrated-order/order-list/${value}`}
        style={{ color: "#1D4ED8", fontSize: 13, textDecoration: "none" }}
        onClick={(e) => e.stopPropagation()}
      >
        {value}
      </NextLink>
    ),
  },
  {
    field: "orderDate",
    headerName: "Order Date",
    width: 160,
    renderCell: ({ value }) => <Typography fontSize={12}>{value}</Typography>,
  },
  {
    field: "ordererName",
    headerName: "Orderer Name",
    width: 120,
    renderCell: ({ value }) => (
      <Typography fontSize={12} color={value ? "text.primary" : "text.disabled"}>
        {value ?? "-"}
      </Typography>
    ),
  },
  {
    field: "ordererEmail",
    headerName: "Orderer Email",
    width: 180,
    renderCell: ({ value }) => <Typography fontSize={12}>{value}</Typography>,
  },
  {
    field: "ordererPhone",
    headerName: "Orderer Phone",
    width: 140,
    renderCell: ({ value }) => (
      <Typography fontSize={12} color={value ? "text.primary" : "text.disabled"}>
        {value ?? "-"}
      </Typography>
    ),
  },
  {
    field: "status",
    headerName: "Status",
    width: 190,
    renderCell: ({ value }) => <StatusChip status={value as OrderListStatus} />,
  },
  {
    field: "recipientName",
    headerName: "Recipient Name",
    width: 120,
    renderCell: ({ value }) => <Typography fontSize={12}>{value}</Typography>,
  },
  {
    field: "recipientPhone",
    headerName: "Recipient Phone",
    width: 140,
    renderCell: ({ value }) => <Typography fontSize={12}>{value}</Typography>,
  },
  {
    field: "shippingStatuses",
    headerName: "Shipping Status",
    width: 165,
    sortable: false,
    renderCell: (params: GridRenderCellParams<OrderListItem>) => {
      const value = params.value as OrderShippingStatus[] | undefined
      if (!value?.length) return <Typography fontSize={12} color="text.disabled">-</Typography>
      return (
        <Stack spacing={0.5} py={0.5}>
          {value.map((s, i) => <ShippingChip key={i} status={s} />)}
        </Stack>
      )
    },
  },
  {
    field: "shippingNos",
    headerName: "Shipping No",
    width: 160,
    sortable: false,
    renderCell: (params: GridRenderCellParams<OrderListItem>) => {
      const value = params.value as string[] | undefined
      if (!value?.length) return <Typography fontSize={12} color="text.disabled">-</Typography>
      return (
        <Stack spacing={0.25} py={0.5}>
          {value.map((no, i) => (
            <Typography key={i} fontSize={12}>{no}</Typography>
          ))}
        </Stack>
      )
    },
  },
]

export default function OrderListTable({
  items,
  selectedIds,
  onSelectionChange,
  isLoading,
  isError,
  onRetry,
}: Props) {
  if (isError) {
    return (
      <Box
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          py: 8,
          gap: 2,
        }}
      >
        <ErrorOutlineIcon sx={{ fontSize: 40, color: "error.main" }} />
        <Typography fontSize={14} color="text.secondary">
          데이터를 불러오는 중 오류가 발생했습니다.
        </Typography>
        {onRetry && (
          <Button size="small" variant="outlined" onClick={onRetry}>
            다시 시도
          </Button>
        )}
      </Box>
    )
  }

  return (
    <DataGrid
      rows={items}
      columns={columns}
      getRowId={(row) => row.orderId}
      checkboxSelection
      disableRowSelectionOnClick
      loading={isLoading}
      rowSelectionModel={{ type: "include", ids: new Set(selectedIds) }}
      onRowSelectionModelChange={(model: GridRowSelectionModel) => {
        const ids = model.type === "include"
          ? Array.from(model.ids).map(String)
          : []
        onSelectionChange(ids)
      }}
      density="compact"
      pageSizeOptions={[100]}
      initialState={{ pagination: { paginationModel: { pageSize: 100 } } }}
      getRowHeight={() => "auto"}
      sx={{
        fontSize: 13,
        "& .MuiDataGrid-cell": {
          alignItems: "center",
          py: 0.5,
        },
        "& .MuiDataGrid-columnHeader": {
          backgroundColor: "#F9FAFB",
          fontSize: 12,
          fontWeight: 600,
        },
      }}
      localeText={{
        noRowsLabel: "검색 결과가 없습니다.",
      }}
    />
  )
}
